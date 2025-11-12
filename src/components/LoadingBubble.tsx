import { useState, useEffect } from 'react';

const loadingTexts = [
    'Đang tìm kiếm trong tài liệu...',
    'Đang phân tích thông tin...',
    'Đang soạn câu trả lời...',
    'Sắp xong rồi...',
];

export function LoadingBubble() {
    const [currentText, setCurrentText] = useState(loadingTexts[0]);
    const [dots, setDots] = useState('');

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentText(prevText => {
                const currentIndex = loadingTexts.indexOf(prevText);
                const nextIndex = (currentIndex + 1) % loadingTexts.length;
                return loadingTexts[nextIndex];
            });
        }, 2000); // Change text every 2 seconds

        const dotsInterval = setInterval(() => {
            setDots(prevDots => (prevDots.length >= 3 ? '' : prevDots + '.'));
        }, 500); // Add a dot every 500ms

        return () => {
            clearInterval(textInterval);
            clearInterval(dotsInterval);
        };
    }, []);

    return <p className="text-sm text-muted-foreground italic">{currentText}{dots}</p>;
}
