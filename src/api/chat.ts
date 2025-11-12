import {MISSION_CONTEXT} from '@/lib/mission-context';

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface ChatTurn {
    role: 'user' | 'model';
    text: string;
}

export async function askMissionAssistant(question: string, history: ChatTurn[]): Promise<string> {
    if (!GEMINI_API_KEY) {
        throw new Error('Thiếu cấu hình GEMINI_API_KEY. Vui lòng thêm VITE_GEMINI_API_KEY vào môi trường của bạn.');
    }

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
        throw new Error('Vui lòng nhập câu hỏi.');
    }

    const baseInstruction =
        `Bạn là trợ lý lịch sử chỉ dựa trên nguồn tư liệu duy nhất bên dưới.\n\n` +
        `Hướng dẫn định dạng & phong cách:\n` +
        `- Trả lời ngắn gọn (tối đa khoảng 3 đoạn, ưu tiên gạch đầu dòng) và chỉ dùng thông tin có trong tài liệu.\n` +
        `- Sử dụng Markdown cơ bản: tiêu đề, danh sách, **chữ đậm**, *chữ nghiêng* khi cần giúp dễ đọc.\n` +
        `- Nếu tài liệu không có thông tin liên quan, hãy trả lời chính xác: "Tôi không tìm thấy thông tin phù hợp trong tài liệu được cung cấp."\n\n` +
        `Tài liệu tham chiếu:\n"""\n${MISSION_CONTEXT}\n"""`;

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

    const data = await response.json();

    const answer = data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text?.trim())
        .filter(Boolean)
        .join('\n');

    if (!answer) {
        throw new Error('Không nhận được phản hồi từ Gemini.');
    }

    return answer;
}
