import {MISSION_CONTEXT} from '@/lib/mission-context';

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface ChatTurn {
    role: 'user' | 'model';
    text: string;
}

function findRelevantContext(question: string, context: string, topK = 5): string {
    const chunks = context.split(/\n\s*\n/);
    const questionWords = new Set(question.toLowerCase().split(/\s+/));

    const scoredChunks = chunks.map(chunk => {
        const chunkWords = new Set(chunk.toLowerCase().split(/\s+/));
        let score = 0;
        for (const word of questionWords) {
            if (chunkWords.has(word)) {
                score++;
            }
        }
        return {chunk, score};
    });

    scoredChunks.sort((a, b) => b.score - a.score);

    return scoredChunks.slice(0, topK).map(c => c.chunk).join('\n\n');
}

export async function askMissionAssistant({
    question,
    history,
    onChunk,
    onComplete,
    onError,
}: {
    question: string;
    history: ChatTurn[];
    onChunk: (chunk: string) => void;
    onComplete: () => void;
    onError: (error: Error) => void;
}): Promise<void> {
    if (!GEMINI_API_KEY) {
        onError(new Error('Thiếu cấu hình GEMINI_API_KEY. Vui lòng thêm VITE_GEMINI_API_KEY vào môi trường của bạn.'));
        return;
    }

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
        onError(new Error('Vui lòng nhập câu hỏi.'));
        return;
    }

    const relevantContext = findRelevantContext(trimmedQuestion, MISSION_CONTEXT);

    const baseInstruction =
        `Bạn là trợ lý lịch sử chỉ dựa trên nguồn tư liệu duy nhất bên dưới.\n\n` +
        `Hướng dẫn định dạng & phong cách:\n` +
        `- Trả lời ngắn gọn (tối đa khoảng 3 đoạn, ưu tiên gạch đầu dòng) và chỉ dùng thông tin có trong tài liệu.\n` +
        `- Sử dụng Markdown cơ bản: tiêu đề, danh sách, **chữ đậm**, *chữ nghiêng* khi cần giúp dễ đọc.\n` +
        `- Nếu tài liệu không có thông tin liên quan, hãy trả lời chính xác: "Tôi không tìm thấy thông tin phù hợp trong tài liệu được cung cấp."\n\n` +
        `Tài liệu tham chiếu:\n"""\n${relevantContext}\n"""`;

    const conversation = [
        {
            role: 'user',
            parts: [{text: baseInstruction}],
        },
        ...history.map((turn) => ({
            role: turn.role,
            parts: [{text: turn.text}],
        })),
        {
            role: 'user',
            parts: [{text: trimmedQuestion}],
        },
    ];

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: conversation,
                generationConfig: {
                    temperature: 0.2,
                    topK: 40,
                    topP: 0.9,
                    maxOutputTokens: 4096,
                },
                safetySettings: [
                    {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
                    {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
                    {category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
                    {category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
                ],
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Gemini API lỗi: ${response.status} ${errorBody}`);
        }

        if (!response.body) {
            throw new Error('Không nhận được phản hồi stream từ Gemini.');
        }

        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        const buffer: string[] = [];

        while (true) {
            const {value, done} = await reader.read();
            if (done) {
                break;
            }

            buffer.push(value);
            const bufferedString = buffer.join('');
            
            // The response is a stream of JSON objects, sometimes multiple in one chunk
            const lines = bufferedString.split('\n');
            
            let processableJson = '';
            for (let i = 0; i < lines.length - 1; i++) {
                processableJson += lines[i];
            }
            buffer[0] = lines[lines.length - 1];
            buffer.length = 1;

            if (processableJson.startsWith(',')) {
                processableJson = processableJson.substring(1);
            }
            if (!processableJson.startsWith('[')) {
                processableJson = '[' + processableJson;
            }
            if (!processableJson.endsWith(']')) {
                processableJson = processableJson + ']';
            }
            
            try {
                const jsonResponse = JSON.parse(processableJson);
                const text = jsonResponse[0]?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    onChunk(text);
                }
            } catch (e) {
                // Ignore parsing errors for incomplete JSON
            }
        }
    } catch (error) {
        onError(error instanceof Error ? error : new Error('Lỗi không xác định'));
    } finally {
        onComplete();
    }
}
