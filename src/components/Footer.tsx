import {useLocation} from 'react-router-dom';

// Background image credits mapping
const BACKGROUND_CREDITS: Record<string, string> = {
    '/': 'Nguồn ảnh nền: Thông tấn xã Việt Nam',
    '/quan-diem-co-ban': 'Nguồn ảnh nền: Tạo bởi Gemini - Prompt: Industrial revolution painting dark, 19th century factory interior vintage, steam engine machinery texture',
    '/giai-cap-cong-nhan-hien-nay': 'Nguồn ảnh nền: Tạo bởi Gemini - Prompt: Soviet worker propaganda poster muted, historical strike photos 1900s, vintage workers unity painting',
    '/giai-cap-cong-nhan-viet-nam': 'Nguồn ảnh nền: Tạp chí Tuyên giáo',
    '/quiz': 'Nguồn ảnh nền: https://thechap.co.uk/get-the-look-workwear/vintage-workers/',
    '/cau-hoi-on-tap': 'Nguồn ảnh nền: Tạo bởi Gemini - Prompt: Industrial revolution painting dark, 19th century factory interior vintage, steam engine machinery texture',
};

export function Footer() {
    const location = useLocation();
    const credit = BACKGROUND_CREDITS[location.pathname];

    if (!credit) return null;

    return (
        <footer className="relative z-10 mt-auto py-4 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs text-muted-foreground text-center italic">
                        {credit}
                    </p>
                </div>
            </div>
        </footer>
    );
}
