import {useEffect, useMemo, useRef, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import {MessageCircle, Send, X} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {askMissionAssistant, type ChatTurn} from '@/api/chat';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    status?: 'ready' | 'pending' | 'error';
}

const suggestedQuestions = [
    'Trình bày sứ mệnh lịch sử của giai cấp công nhân.',
    'Vì sao giai cấp công nhân có khả năng lãnh đạo cách mạng?',
    'So sánh đặc điểm giai cấp công nhân hiện nay và trước đây.',
    'Những điều kiện nào giúp sứ mệnh lịch sử được thực hiện?',
];

const generateId = () => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

export function ChatBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: 'Xin chào! Tôi là Trợ lý Sứ mệnh lịch sử và chỉ trả lời dựa trên tài liệu chương 2. Bạn muốn tìm hiểu điều gì?',
            sender: 'bot',
            timestamp: new Date(),
            status: 'ready',
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    const hasUserAskedQuestion = useMemo(
        () => messages.some((message) => message.sender === 'user'),
        [messages]
    );

    useEffect(() => {
        if (isOpen) {
            endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages, isOpen]);

    const sendMessage = async (messageText?: string) => {
        const textToSend = (messageText ?? inputValue).trim();
        if (!textToSend || isLoading) {
            return;
        }

        const userMessage: Message = {
            id: generateId(),
            text: textToSend,
            sender: 'user',
            timestamp: new Date(),
            status: 'ready',
        };

        const pendingMessageId = generateId();
        const pendingBotMessage: Message = {
            id: pendingMessageId,
            text: 'Đang soạn câu trả lời...',
            sender: 'bot',
            timestamp: new Date(),
            status: 'pending',
        };

        const historyForApi: ChatTurn[] = [...messages, userMessage]
            .filter((message) => !(message.sender === 'bot' && message.status === 'pending'))
            .map((message) => ({
                role: message.sender === 'user' ? 'user' : 'model',
                text: message.text,
            }));

        setMessages((prev) => [...prev, userMessage, pendingBotMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const answer = await askMissionAssistant(textToSend, historyForApi);
            setMessages((prev) =>
                prev.map((message) =>
                    message.id === pendingMessageId
                        ? {
                            ...message,
                            text: answer,
                            status: 'ready',
                            timestamp: new Date(),
                        }
                        : message
                )
            );
        } catch (error) {
            setMessages((prev) =>
                prev.map((message) =>
                    message.id === pendingMessageId
                        ? {
                            ...message,
                            text:
                                error instanceof Error
                                    ? error.message
                                    : 'Có lỗi xảy ra khi gọi trợ lý. Vui lòng thử lại.',
                            status: 'error',
                            timestamp: new Date(),
                        }
                        : message
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-24 right-4 w-[calc(100vw-2rem)] max-w-xl sm:max-w-2xl shadow-lg z-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-lg">Trợ Lý Ảo</CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-6 w-6"
                        >
                            <X className="h-4 w-4"/>
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {!hasUserAskedQuestion && (
                            <div className="space-y-2 rounded-lg border bg-muted/50 p-3">
                                <p className="text-xs font-medium text-muted-foreground">Gợi ý câu hỏi</p>
                                <div className="grid gap-2">
                                    {suggestedQuestions.map((question) => (
                                        <Button
                                            key={question}
                                            variant="secondary"
                                            size="sm"
                                            className="w-full justify-start text-left whitespace-normal break-words text-xs"
                                            onClick={() => sendMessage(question)}
                                            disabled={isLoading}
                                        >
                                            {question}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <ScrollArea className="max-h-[70vh] pr-4">
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${
                                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                                message.sender === 'user'
                                                    ? 'bg-primary text-white'
                                                    : message.status === 'error'
                                                        ? 'bg-destructive text-destructive-foreground'
                                                        : 'bg-muted'
                                            } ${message.status === 'pending' ? 'italic opacity-80' : ''}`}
                                        >
                                            {message.sender === 'bot' ? (
                                                <div
                                                    className="prose prose-xs max-w-none text-black prose-headings:text-black prose-headings:mb-1 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            p: ({node, ...props}) => <p {...props}
                                                                                        className="my-1 last:mb-0"/>,
                                                            ul: ({node, ...props}) => <ul {...props}
                                                                                          className="my-2 list-disc pl-4"/>,
                                                            ol: ({node, ...props}) => <ol {...props}
                                                                                          className="my-2 list-decimal pl-4"/>,
                                                            li: ({node, ...props}) => <li {...props} className="my-0"/>,
                                                        }}
                                                    >
                                                        {message.text}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p className="text-xs whitespace-pre-line">{message.text}</p>
                                            )}
                                            <p className="text-[0.65rem] opacity-70 mt-1">
                                                {message.timestamp.toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={endOfMessagesRef}/>
                            </div>
                        </ScrollArea>

                        <div className="flex gap-2">
                            <Input
                                placeholder="Nhập tin nhắn..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                disabled={isLoading}
                                className="text-sm"
                            />
                            <Button size="icon" onClick={() => sendMessage()} disabled={isLoading}>
                                <Send className="h-4 w-4"/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Floating Button */}
            <Button
                size="icon"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MessageCircle className="h-6 w-6"/>
            </Button>
        </>
    );
}
