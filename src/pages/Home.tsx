import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {BookOpen, Flag, Globe} from 'lucide-react';

export function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-4xl md:text-5xl text-center">Chương 2</CardTitle>
                        <CardDescription className="text-2xl md:text-3xl text-center font-bold text-foreground">
                            SỨ MỆNH LỊCH SỬ CỦA GIAI CẤP CÔNG NHÂN
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-lg text-center">
                            Tài liệu học tập về quan điểm cơ bản của chủ nghĩa Mác - Lênin về giai cấp công nhân
                            và sứ mệnh lịch sử của giai cấp công nhân trong bối cảnh hiện nay
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mục Tiêu</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">1. Về kiến thức:</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-foreground">
                                    Sinh viên nắm vững quan điểm cơ bản của chủ nghĩa Mác - Lênin về giai cấp công nhân
                                    và sứ mệnh lịch sử của giai cấp công nhân, nội dung, biểu hiện và ý nghĩa của sứ
                                    mệnh
                                    đó trong bối cảnh hiện nay.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">2. Về kỹ năng:</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-foreground">
                                    Biết vận dụng phương pháp luận và các phương pháp nghiên cứu chuyên ngành chủ nghĩa
                                    xã hội khoa học vào việc phân tích sứ mệnh lịch sử của giai cấp công nhân Việt Nam
                                    trong tiến trình cách mạng Việt Nam, trong sự nghiệp đổi mới và hội nhập quốc tế
                                    hiện nay.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">3. Về tư tưởng:</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-foreground">
                                    Góp phần xây dựng và củng cố niềm tin khoa học, lập trường giai cấp công nhân đối
                                    với
                                    sự nghiệp xây dựng chủ nghĩa xã hội trên thế giới cũng như ở Việt Nam.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Lí Do Của Website</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <CardDescription className="text-base text-foreground leading-relaxed">
                            Với tư cách là sinh viên ngành Kỹ thuật Phần mềm, chúng em nhận thấy một thách thức chung trong giáo dục hiện đại: làm thế nào để chuyển đổi các nội dung học thuật, đặc biệt là các môn lý luận chính trị, từ dạng văn bản truyền thống sang một nền tảng số hóa sáng sủa, thu hút và dễ tiếp cận hơn.
                        </CardDescription>
                        <CardDescription className="text-base text-foreground leading-relaxed">
                            Nội dung về "Sứ mệnh lịch sử của giai cấp công nhân" là một học phần quan trọng, nhõi của môn học, với hy vọng mang lại một công cụ học tập hiệu quả và thú vị hơn cho các bạn sinh viên.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Giới Thiệu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base text-foreground leading-relaxed">
                            Sứ mệnh lịch sử thế giới của giai cấp công nhân là nội dung chủ yếu, điểm căn bản của
                            chủ nghĩa Mác - Lênin, là phạm trù trung tâm, nguyên lý xuất phát của chủ nghĩa xã hội
                            khoa học. Đó cũng là trọng điểm của cuộc đấu tranh tư tưởng lý luận trong thời đại ngày nay.
                        </CardDescription>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <BookOpen className="h-8 w-8 text-primary"/>
                                <CardTitle>Quan Điểm Cơ Bản Của Chủ Nghĩa Mác - Lênin</CardTitle>
                            </div>
                            <CardDescription>
                                Khái niệm, đặc điểm, nội dung sứ mệnh lịch sử và các điều kiện thực hiện
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link to="/quan-diem-co-ban">Đọc Tiếp →</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Globe className="h-8 w-8 text-primary"/>
                                <CardTitle>Giai Cấp Công Nhân Hiện Nay</CardTitle>
                            </div>
                            <CardDescription>
                                Đặc điểm và thực hiện sứ mệnh lịch sử của giai cấp công nhân trên thế giới hiện nay
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link to="/giai-cap-cong-nhan-hien-nay">Đọc Tiếp →</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Flag className="h-8 w-8 text-primary"/>
                                <CardTitle>Sứ Mệnh Lịch Sử Của Giai Cấp Công Nhân Việt Nam</CardTitle>
                            </div>
                            <CardDescription>
                                Đặc điểm, nội dung sứ mệnh lịch sử và phương hướng xây dựng giai cấp công nhân Việt Nam
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link to="/giai-cap-cong-nhan-viet-nam">Đọc Tiếp →</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
