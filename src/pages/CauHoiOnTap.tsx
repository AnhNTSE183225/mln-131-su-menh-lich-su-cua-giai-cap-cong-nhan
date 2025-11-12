import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export function CauHoiOnTap() {
    const questions = [
        {
            number: 1,
            question: "Nêu những quan điểm cơ bản của chủ nghĩa Mác - Lênin về giai cấp công nhân và nội dung sứ mệnh lịch sử của giai cấp công nhân?",
        },
        {
            number: 2,
            question: "Trình bày những điều kiện khách quan và nhân tố chủ quan quy định sứ mệnh lịch sử của giai cấp công nhân?",
        },
        {
            number: 3,
            question: "Phân tích nội dung sứ mệnh lịch sử của giai cấp công nhân trên thế giới hiện nay?",
        },
        {
            number: 4,
            question: "Phân tích đặc điểm của giai cấp công nhân Việt Nam và nội dung sứ mệnh lịch sử của giai cấp công nhân Việt Nam hiện nay?",
        },
        {
            number: 5,
            question: "Phương hướng và giải pháp chủ yếu để xây dựng giai cấp công nhân Việt Nam hiện nay theo quan điểm của Đảng Cộng sản Việt Nam?",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl md:text-4xl text-center">
                            CÂU HỎI ÔN TẬP
                        </CardTitle>
                        <CardDescription className="text-center text-lg">
                            Chương 2: Sứ Mệnh Lịch Sử Của Giai Cấp Công Nhân
                        </CardDescription>
                    </CardHeader>
                </Card>

                <div className="space-y-4">
                    {questions.map((item) => (
                        <Card key={item.number}>
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Câu {item.number}: {item.question}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-foreground leading-relaxed">
                                    Để trả lời câu hỏi này, hãy tham khảo các phần nội dung liên quan trong các trang
                                    học tập:
                                </CardDescription>
                                <CardDescription className="text-base text-muted-foreground mt-2">
                                    •
                                    Câu {item.number} - {item.number === 1 ? "Xem phần: Quan Điểm Cơ Bản Của Chủ Nghĩa Mác - Lênin" :
                                    item.number === 2 ? "Xem phần: Điều Kiện Quy Định Sứ Mệnh Lịch Sử" :
                                        item.number === 3 ? "Xem phần: Giai Cấp Công Nhân Hiện Nay" :
                                            item.number === 4 ? "Xem phần: Sứ Mệnh Lịch Sử Của Giai Cấp Công Nhân Việt Nam" :
                                                "Xem phần: Phương Hướng Và Giải Pháp Xây Dựng"}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

