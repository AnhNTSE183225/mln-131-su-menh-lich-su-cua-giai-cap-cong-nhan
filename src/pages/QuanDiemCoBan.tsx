import {type PageContent, PaginatedContent} from '@/components/PaginatedContent';
import page1 from '/images/pages/quan-diem-co-ban/page-1.png';
import page2 from '/images/pages/quan-diem-co-ban/page-2.png';
import page3 from '/images/pages/quan-diem-co-ban/page-3.png';

export function QuanDiemCoBan() {
    const pages: PageContent[] = [
        // Page 1: Khái niệm và đặc điểm của giai cấp công nhân
        {
            title: '1. Khái niệm và đặc điểm của giai cấp công nhân',
            imagePosition: 'top',
            imageUrl: page1,
            imageSource: 'Karl Marx và Friedrich Engels - Ảnh tư liệu',
            content: (
                <div className="space-y-8">
                    {/* Phần Khái niệm */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-primary">a) Khái niệm giai cấp công nhân</h3>

                        {/* Giới thiệu */}
                        <div className="mb-6 p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                            <p className="text-base text-foreground leading-relaxed">
                                C. Mác và Ph. Ăngghen đã sử dụng nhiều thuật ngữ để chỉ giai cấp công nhân như: <span
                                className="font-semibold">giai cấp vô sản</span>,
                                <span className="font-semibold"> giai cấp công nhân hiện đại</span>, <span
                                className="font-semibold">giai cấp công nhân đại công nghiệp</span>...
                                - những cụm từ đồng nghĩa chỉ <span className="font-semibold">con đẻ của nền đại công nghiệp tư bản chủ nghĩa</span>,
                                giai cấp đại biểu cho <span
                                className="font-semibold">lực lượng sản xuất tiên tiến</span> và <span
                                className="font-semibold">phương thức sản xuất hiện đại</span>.
                            </p>
                        </div>

                        {/* Hai phương diện cơ bản - Grid 2 cột */}
                        <p className="text-base font-semibold mb-4 text-foreground">Giai cấp công nhân được xác định
                            theo hai phương diện cơ bản:</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* Phương diện Kinh tế - Xã hội */}
                            <div className="bg-card p-6 rounded-lg border border-primary/40">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 bg-primary rounded-lg">
                                        <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-primary">Phương diện Kinh tế - Xã hội</h4>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-sm leading-relaxed text-foreground">
                                        Là <span className="font-semibold">sản phẩm và chủ thể</span> của nền sản xuất
                                        đại công nghiệp, giai cấp công nhân
                                        <span
                                            className="font-semibold"> vận hành các công cụ sản xuất công nghiệp</span> ngày
                                        càng hiện đại và xã hội hóa cao.
                                    </p>
                                    <div className="bg-secondary p-3 rounded border-l-2 border-primary">
                                        <p className="text-sm font-semibold mb-2 text-muted-foreground">Đặc điểm nổi
                                            bật:</p>
                                        <ul className="text-sm space-y-1 ml-4 text-foreground">
                                            <li>• Sản xuất bằng máy móc</li>
                                            <li>• Lao động có tính xã hội hóa</li>
                                            <li>• Năng suất lao động cao</li>
                                            <li>• Tạo tiền đề vật chất cho xã hội mới</li>
                                        </ul>
                                    </div>
                                    <blockquote
                                        className="border-l-4 border-primary pl-4 py-2 bg-secondary/50 italic text-sm text-muted-foreground">
                                        <p>"Trong công trường thủ công và nghề thủ công, người công nhân sử dụng công cụ
                                            của mình, còn trong công xưởng thì người công nhân phải phục vụ máy
                                            móc."</p>
                                        <footer className="text-xs mt-1 text-muted-foreground/70">- C. Mác & Ph.
                                            Ăngghen
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>

                            {/* Phương diện Chính trị - Xã hội */}
                            <div className="bg-card p-6 rounded-lg border border-primary/60">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 bg-primary rounded-lg">
                                        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-primary">Phương diện Chính trị - Xã hội</h4>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-sm leading-relaxed text-foreground">
                                        Là <span className="font-semibold">sản phẩm xã hội</span> của quá trình phát
                                        triển tư bản chủ nghĩa,
                                        một xã hội có <span className="font-semibold">"điều kiện tồn tại dựa trên chế độ làm thuê"</span>.
                                    </p>
                                    <div className="bg-secondary p-3 rounded border-l-2 border-primary">
                                        <p className="text-sm text-foreground">
                                            <span className="font-semibold">Giai cấp vô sản</span> là giai cấp
                                            những <span className="font-semibold">công nhân làm thuê hiện đại</span>,
                                            vì <span className="font-semibold">mất các tư liệu sản xuất</span> của bản
                                            thân, nên buộc phải
                                            <span className="font-semibold"> bán sức lao động</span> để sống.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Định nghĩa tổng hợp */}
                        <div
                            className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border-2 border-primary/30">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-primary mt-1 flex-shrink-0" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                    <p className="font-bold text-primary mb-2">Định nghĩa theo chủ nghĩa Mác -
                                        Lênin:</p>
                                    <p className="text-base leading-relaxed">
                                        <span className="font-semibold">Giai cấp công nhân</span> là một <span
                                        className="font-semibold">tập đoàn xã hội</span>,
                                        hình thành và phát triển cùng với quá trình phát triển của <span
                                        className="font-semibold">nền công nghiệp hiện đại</span>;
                                        họ lao động bằng <span className="font-semibold">phương thức công nghiệp ngày càng hiện đại</span> và
                                        gắn liền với
                                        <span className="font-semibold"> quá trình sản xuất vật chất hiện đại</span>, là
                                        đại biểu cho
                                        <span className="font-semibold"> phương thức sản xuất mang tính xã hội hóa ngày càng cao</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phần Đặc điểm */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-primary">b) Đặc điểm của giai cấp công nhân</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Đặc điểm 1 */}
                            <div className="flex gap-4 p-4 bg-muted rounded-lg border border-primary/30">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg">1
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Phương thức lao động công nghiệp</h4>
                                    <p className="text-sm leading-relaxed text-foreground">
                                        Lao động bằng <span className="font-semibold">máy móc</span>, tạo ra <span
                                        className="font-semibold">năng suất cao</span>,
                                        quá trình lao động mang <span className="font-semibold">tính xã hội hóa</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Đặc điểm 2 */}
                            <div className="flex gap-4 p-4 bg-muted rounded-lg border border-muted/30">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-foreground font-bold shadow-lg">2
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-muted-foreground mb-2">Sản phẩm của đại công
                                        nghiệp</h4>
                                    <p className="text-sm leading-relaxed text-foreground">
                                        Là <span className="font-semibold">sản phẩm của nền đại công nghiệp</span>,
                                        là <span className="font-semibold">chủ thể</span> của quá trình sản xuất vật
                                        chất hiện đại.
                                    </p>
                                </div>
                            </div>

                            {/* Đặc điểm 3 */}
                            <div className="flex gap-4 p-4 bg-muted rounded-lg border border-primary/40">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg">3
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Phẩm chất đặc biệt</h4>
                                    <p className="text-sm leading-relaxed text-foreground">
                                        <span className="font-semibold">Tính tổ chức</span>, <span
                                        className="font-semibold">kỷ luật lao động</span>,
                                        <span className="font-semibold"> tinh thần hợp tác</span> và <span
                                        className="font-semibold">tâm lý lao động công nghiệp</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Đặc điểm 4 */}
                            <div className="flex gap-4 p-4 bg-muted rounded-lg border border-primary/40">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-foreground font-bold shadow-lg">4
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">Giai cấp cách mạng triệt để</h4>
                                    <p className="text-sm leading-relaxed text-foreground">
                                        Đại diện cho <span className="font-semibold">lực lượng sản xuất tiên tiến</span>,
                                        mang <span className="font-semibold">sứ mệnh lịch sử</span> xây dựng xã hội mới.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video YouTube */}
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4 text-primary">Video tham khảo</h3>
                        <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                src="https://www.youtube.com/embed/tZY9Po_0bxo"
                                title="Video về giai cấp công nhân"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            ),
        },

        // Page 2: Nội dung sứ mệnh lịch sử của giai cấp công nhân
        {
            title: '2. Nội dung sứ mệnh lịch sử của giai cấp công nhân',
            imagePosition: 'middle',
            imageUrl: page2,
            imageSource: 'Áp phích tuyên truyền của Cộng sản Nga năm 1929. Tác phẩm vẽ một người công nhân đang phá vỡ xiềng xích dưới lá cờ có chân dung Lênin. Khẩu hiệu: "Ngày Quốc tế Lao động muôn năm!" - Tác giả: Vladimir Deni',
            content: (
                <div className="space-y-6">
                    {/* Introduction */}
                    <div className="bg-card p-5 rounded-lg border-l-4 border-primary">
                        <p className="text-base text-foreground leading-relaxed mb-3">
                            Nội dung sứ mệnh lịch sử của giai cấp công nhân chính là những nhiệm vụ mà giai cấp công
                            nhân cần phải thực hiện với tư cách là
                            <span className="font-semibold"> giai cấp tiên phong</span>, là <span
                            className="font-semibold">lực lượng đi đầu</span> trong cuộc cách mạng xác lập hình thái
                            kinh tế - xã hội cộng sản chủ nghĩa.
                        </p>
                        <p className="text-base text-foreground leading-relaxed font-semibold">
                            Sứ mệnh lịch sử của giai cấp công nhân thể hiện trên ba nội dung cơ bản:
                        </p>
                    </div>

                    {/* Three main contents in cards */}
                    <div className="space-y-5">
                        {/* Economic Content */}
                        <div className="bg-card p-6 rounded-lg border-l-4 border-primary">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-primary rounded-lg flex-shrink-0">
                                    <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-3">Nội dung Kinh tế</h4>
                                    <div className="space-y-3">
                                        <p className="text-base text-foreground leading-relaxed">
                                            Là <span className="font-semibold">nhân tố hàng đầu của lực lượng sản xuất xã hội hóa cao</span>,
                                            giai cấp công nhân cũng là đại biểu cho quan hệ sản xuất mới, sản xuất
                                            ra của cải vật chất ngày càng nhiều đáp ứng nhu cầu ngày càng tăng của con
                                            người và xã hội. Bằng cách đó, giai cấp công nhân tạo
                                            <span className="font-semibold"> tiền đề vật chất - kỹ thuật</span> cho sự
                                            ra đời của xã hội mới.
                                        </p>
                                        <p className="text-base text-foreground leading-relaxed">
                                            Mặt khác, tính chất <span
                                            className="font-semibold">xã hội hóa cao</span> của lực lượng sản xuất đòi
                                            hỏi một <span className="font-semibold">quan hệ sản xuất mới</span>, phù hợp
                                            với <span className="font-semibold">chế độ công hữu</span> các tư
                                            liệu sản xuất chủ yếu của xã hội là nền tảng, tiêu biểu cho lợi ích của toàn
                                            xã hội.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Political-Social Content */}
                        <div className="bg-card p-6 rounded-lg border-l-4 border-primary">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-primary rounded-lg flex-shrink-0">
                                    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-3">Nội dung Chính trị - Xã hội</h4>
                                    <p className="text-base text-foreground leading-relaxed">
                                        Giai cấp công nhân cùng với nhân dân lao động, dưới sự lãnh đạo của <span
                                        className="font-semibold">Đảng Cộng sản</span>,
                                        tiến hành <span className="font-semibold">cách mạng chính trị</span> để lật đổ
                                        quyền thống trị của giai cấp thống trị,
                                        xóa bỏ chế độ bóc lột, áp bức, giành quyền lực về tay giai cấp công nhân và nhân
                                        dân lao động.
                                        Thiết lập <span className="font-semibold">nhà nước kiểu mới</span>, mang bản
                                        chất giai cấp công nhân,
                                        xây dựng nền <span className="font-semibold">dân chủ xã hội chủ nghĩa</span>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Cultural-Ideological Content */}
                        <div className="bg-card p-6 rounded-lg border-l-4 border-muted">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-muted rounded-lg flex-shrink-0">
                                    <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-muted-foreground mb-3">Nội dung Văn hóa, Tư
                                        tưởng</h4>
                                    <p className="text-base text-foreground leading-relaxed mb-4">
                                        Thực hiện sứ mệnh lịch sử của mình, giai cấp công nhân trong tiến trình cách
                                        mạng cải tạo xã hội cũ và
                                        xây dựng xã hội mới trên lĩnh vực văn hóa, tư tưởng cần phải tập trung xây
                                        dựng <span className="font-semibold">hệ giá trị mới</span>:
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                        <div
                                            className="bg-secondary px-3 py-2 rounded-md text-center font-semibold text-primary border border-primary/30">
                                            Lao động
                                        </div>
                                        <div
                                            className="bg-secondary px-3 py-2 rounded-md text-center font-semibold text-primary border border-primary/30">
                                            Công bằng
                                        </div>
                                        <div
                                            className="bg-secondary px-3 py-2 rounded-md text-center font-semibold text-primary border border-primary/30">
                                            Dân chủ
                                        </div>
                                        <div
                                            className="bg-secondary px-3 py-2 rounded-md text-center font-semibold text-primary border border-primary/30">
                                            Bình đẳng
                                        </div>
                                        <div
                                            className="bg-secondary px-3 py-2 rounded-md text-center font-semibold text-primary border border-primary/30">
                                            Tự do
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },

        // Page 3: Những điều kiện quy định và thực hiện sứ mệnh lịch sử
        {
            title: '3. Những điều kiện quy định và thực hiện sứ mệnh lịch sử của giai cấp công nhân',
            imagePosition: 'bottom',
            imageUrl: page3,
            imageSource: 'Bài phát biểu của V. I. Lênin tại cuộc mít tinh của công nhân nhà máy Putilov vào tháng 5 năm 1917 - Tác phẩm năm 1929',
            content: (
                <div className="space-y-6">
                    {/* Objective Conditions Section */}
                    <div className="bg-card p-6 rounded-lg border border-primary/40">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-primary rounded-lg">
                                <svg className="w-7 h-7 text-background" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-primary">a) Điều kiện Khách quan quy định sứ mệnh lịch
                                sử của giai cấp công nhân</h3>
                        </div>

                        <div className="space-y-4">
                            {/* First objective condition */}
                            <div className="bg-secondary p-5 rounded-lg border-l-4 border-primary">
                                <div className="flex gap-3">
                                    <div
                                        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold shadow-lg">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-2 text-primary">Do địa vị kinh tế của
                                            giai cấp công nhân</h4>
                                        <p className="text-base text-foreground leading-relaxed">
                                            Giai cấp công nhân là <span className="font-semibold">con đẻ, sản phẩm của nền đại công nghiệp</span>,
                                            có tính <span className="font-semibold">xã hội hóa ngày càng cao</span>,
                                            là <span className="font-semibold">chủ thể của quá trình sản xuất vật chất hiện đại</span>.
                                            Vì thế, giai cấp công nhân đại diện cho <span className="font-semibold">phương thức sản xuất tiên tiến</span> và <span
                                            className="font-semibold">lực lượng sản xuất hiện đại</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Second objective condition */}
                            <div className="bg-secondary p-5 rounded-lg border-l-4 border-primary">
                                <div className="flex gap-3">
                                    <div
                                        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold shadow-lg">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-2 text-primary">Do địa vị chính trị - xã
                                            hội của giai cấp công nhân quy định</h4>
                                        <p className="text-base text-foreground leading-relaxed">
                                            Là giai cấp <span className="font-semibold">sản xuất ra của cải vật chất chủ yếu cho xã hội</span>,
                                            nhưng trong chủ nghĩa tư bản giai cấp công nhân
                                            <span
                                                className="font-semibold"> không sở hữu tư liệu sản xuất chủ yếu</span>,
                                            phải bán sức lao động để kiếm sống, bị bóc lột nặng nề,
                                            vì vậy <span className="font-semibold">lợi ích cơ bản của họ đối lập trực tiếp</span> với
                                            lợi ích cơ bản của giai cấp tư sản.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subjective Conditions Section */}
                    <div className="bg-card p-6 rounded-lg border border-primary/60">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-primary rounded-lg">
                                <svg className="w-7 h-7 text-foreground" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-primary">b) Điều kiện Chủ quan để giai cấp công nhân
                                thực hiện sứ mệnh lịch sử</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* First subjective condition */}
                            <div className="bg-secondary p-5 rounded-lg border-l-4 border-muted">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="p-2 bg-muted rounded-lg flex-shrink-0">
                                        <svg className="w-5 h-5 text-background" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-muted-foreground mb-2">Sự phát triển của
                                            bản thân giai cấp công nhân</h4>
                                        <p className="text-sm text-foreground leading-relaxed">
                                            Sự phát triển về <span className="font-semibold">số lượng</span> phải gắn
                                            liền với sự phát triển về <span
                                            className="font-semibold">chất lượng</span> của giai cấp công nhân hiện đại,
                                            đảm bảo cho giai cấp công nhân thực hiện được sứ mệnh lịch sử của mình. Chất
                                            lượng giai cấp công nhân phải thể hiện ở
                                            <span
                                                className="font-semibold"> trình độ trưởng thành về ý thức chính trị</span> của
                                            một giai cấp cách mạng.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Second subjective condition */}
                            <div className="bg-secondary p-5 rounded-lg border-l-4 border-muted">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="p-2 bg-muted rounded-lg flex-shrink-0">
                                        <svg className="w-5 h-5 text-background" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-muted-foreground mb-2">Đảng Cộng sản là
                                            nhân tố chủ quan quan trọng nhất</h4>
                                        <p className="text-sm text-foreground leading-relaxed">
                                            <span className="font-semibold">Đảng Cộng sản</span> - đội tiên phong của
                                            giai cấp công nhân ra đời và đảm nhận vai trò lãnh đạo cuộc cách mạng là dấu
                                            hiệu về
                                            <span className="font-semibold"> sự trưởng thành vượt bậc</span> của giai
                                            cấp công nhân với tư cách là giai cấp cách mạng.
                                            Giai cấp công nhân là <span className="font-semibold">cơ sở xã hội và nguồn bổ sung lực lượng quan trọng nhất</span> của
                                            Đảng.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },

        // Page 4: Vì sao giai cấp công nhân phải tự mình đấu tranh để giải phóng?
        {
            title: '4. Vì sao giai cấp công nhân phải tự mình đấu tranh để giải phóng?',
            imagePosition: 'bottom',
            content: (
                <div className="space-y-8" style={{backgroundColor: '#FAF9F6'}}>
                    {/* Giới thiệu */}
                    <div className="p-6 rounded-lg"
                         style={{backgroundColor: '#FFFFFF', borderLeft: '4px solid #8B1E1E'}}>
                        <h2 className="text-2xl font-bold mb-4" style={{color: '#8B1E1E'}}>
                            4. Vì sao giai cấp công nhân phải tự mình đấu tranh để giải phóng?
                        </h2>
                        <p className="text-base leading-relaxed" style={{color: '#2F2F2F', textAlign: 'justify'}}>
                            Theo quan điểm của Chủ nghĩa Mác – Lênin, sự giải phóng của giai cấp công nhân phải là sự
                            nghiệp của chính bản thân họ.
                            Điều này xuất phát từ ba lý do căn bản về lợi ích, sức mạnh tổ chức và năng lực làm chủ.
                        </p>
                    </div>

                    {/* Lý do 1: Text bên trái - Ảnh bên phải */}
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="p-6 rounded-lg" style={{backgroundColor: '#FFFFFF'}}>
                            <h3 className="text-xl font-bold mb-4" style={{color: '#003366'}}>
                                a. Lý do về lợi ích: Chỉ họ mới có động cơ cách mạng triệt để
                            </h3>
                            <div className="space-y-3">
                                <p className="text-base leading-relaxed"
                                   style={{color: '#2F2F2F', textAlign: 'justify'}}>
                                    Giai cấp tư sản tồn tại nhờ bóc lột, không thể tự xóa bỏ nền tảng của chính mình.
                                    Giai cấp nông dân và tiểu tư sản tuy bị áp bức nhưng thiếu tầm nhìn và tổ chức để
                                    dẫn dắt cách mạng xã hội toàn diện.
                                </p>
                                <p className="text-base leading-relaxed"
                                   style={{color: '#2F2F2F', textAlign: 'justify'}}>
                                    Chỉ có <span className="font-semibold">giai cấp công nhân</span> — những người trực
                                    tiếp tạo ra của cải nhưng không sở hữu tư liệu sản xuất —
                                    mới có động cơ cách mạng triệt để nhất nhằm xóa bỏ tận gốc chế độ bóc lột. Nếu họ
                                    không tự mình đứng lên,
                                    không một giai cấp nào khác sẽ hoặc có thể làm thay sứ mệnh đó.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/images/pages/quan-diem-co-ban/page-4-labor-day.png"
                                alt="Biểu tình công nhân Mỹ - Ngày Quốc tế Lao động 1/5/1886"
                                className="w-full rounded-lg shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop';
                                }}
                            />
                            <p className="text-sm mt-2 italic text-center" style={{color: '#666'}}>
                                Biểu tình công nhân Mỹ tại quảng trường Haymarket, Chicago – Ngày Quốc tế Lao động
                                (1/5/1886).
                                Sự kiện này đã trở thành nguồn gốc của Ngày Quốc tế Lao động trên toàn thế giới.
                            </p>
                        </div>
                    </div>

                    {/* Lý do 2: Ảnh bên trái - Text bên phải */}
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="order-2 md:order-1">
                            <img
                                src="/images/pages/quan-diem-co-ban/page-4-october-revolution.png"
                                alt="Cuộc tấn công vào Cung điện Mùa đông ở Petrograd"
                                className="w-full rounded-lg shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1541872705-1d9c3f6e6b4f?w=800&h=600&fit=crop';
                                }}
                            />
                            <p className="text-sm mt-2 italic text-center" style={{color: '#666'}}>
                                Cuộc tấn công vào Cung điện Mùa đông ở thành phố Petrograd trong Cuộc cách mạng Tháng
                                Mười.
                                Petrograd nay chính là thành phố Saint Petersburg, được xem là cái nôi của Cách mạng
                                tháng Mười Nga.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg order-1 md:order-2" style={{backgroundColor: '#FFFFFF'}}>
                            <h3 className="text-xl font-bold mb-4" style={{color: '#003366'}}>
                                b. Lý do về sức mạnh tổ chức: Chỉ họ mới có khả năng tổ chức thành lực lượng chính trị
                            </h3>
                            <div className="space-y-3">
                                <p className="text-base leading-relaxed"
                                   style={{color: '#2F2F2F', textAlign: 'justify'}}>
                                    Quá trình sản xuất công nghiệp hiện đại đã rèn luyện cho giai cấp công nhân ý thức
                                    tập thể, khả năng đoàn kết và kỷ luật lao động.
                                    Trong nhà máy, hàng nghìn công nhân làm việc có tổ chức, phối hợp và phụ thuộc lẫn
                                    nhau.
                                    Chính điều đó hình thành nên sức mạnh chính trị mà không giai cấp nào khác có được.
                                </p>
                                <p className="text-base leading-relaxed"
                                   style={{color: '#2F2F2F', textAlign: 'justify'}}>
                                    Không phải ngẫu nhiên mà mọi cuộc cách mạng xã hội chủ nghĩa lớn trong thế kỷ 20 đều
                                    do giai cấp công nhân khởi xướng và lãnh đạo.
                                    Khi họ đồng loạt đình công, cả nền kinh tế có thể tê liệt — đó chính là sức mạnh vật
                                    chất của ý thức tổ chức.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lý do 3: Text bên trái - Ảnh bên phải */}
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="p-6 rounded-lg" style={{backgroundColor: '#FFFFFF'}}>
                            <h3 className="text-xl font-bold mb-4" style={{color: '#003366'}}>
                                c. Lý do về năng lực: Họ là chủ thể làm chủ tri thức và sản xuất hiện đại
                            </h3>
                            <div className="space-y-3">
                                <p className="text-base leading-relaxed"
                                   style={{color: '#2F2F2F', textAlign: 'justify'}}>
                                    Công nhân không sở hữu máy móc hay nhà xưởng, nhưng họ là những người trực tiếp vận
                                    hành, làm chủ kỹ năng và hiểu rõ quy trình sản xuất hiện đại.
                                    Khi họ nắm vững khoa học – công nghệ, biết cách sử dụng và cải tiến công nghệ, họ
                                    không còn chỉ là "lao động bị điều khiển"
                                    mà đã trở thành chủ thể sáng tạo trong sản xuất.
                                </p>
                                <p className="text-base leading-relaxed"
                                   style={{color: '#2F2F2F', textAlign: 'justify'}}>
                                    Ở Việt Nam hiện nay, hàng ngàn công nhân tại VinFast, Samsung, Foxconn đã học lập
                                    trình, vận hành robot công nghiệp,
                                    tham gia cải tiến quy trình sản xuất. Đó là cuộc đấu tranh bằng tri thức, giúp họ
                                    nâng cao vị thế và từng bước làm chủ năng lực sản xuất,
                                    dù chưa sở hữu tư liệu sản xuất.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/images/pages/quan-diem-co-ban/page-4-industry-4.png"
                                alt="Công nhân Việt Nam trong Cách mạng Công nghiệp 4.0"
                                className="w-full rounded-lg shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop';
                                }}
                            />
                            <p className="text-sm mt-2 italic text-center" style={{color: '#666'}}>
                                Công nhân Việt Nam làm chủ công nghệ hiện đại trong Cách mạng Công nghiệp 4.0.
                                Họ đang chuyển từ lao động giản đơn sang làm chủ tri thức và kỹ năng số.
                            </p>
                        </div>
                    </div>

                    {/* Kết luận */}
                    <div className="p-6 rounded-lg" style={{backgroundColor: '#FFFFFF', border: '2px solid #8B1E1E'}}>
                        <h3 className="text-xl font-bold mb-4" style={{color: '#8B1E1E'}}>Kết luận</h3>
                        <div className="space-y-3">
                            <p className="text-base leading-relaxed" style={{color: '#2F2F2F', textAlign: 'justify'}}>
                                Nói tóm lại, giai cấp công nhân không thể trông chờ vào sự "ban ơn" hay giải phóng từ
                                một lực lượng nào khác.
                                Họ vừa là nạn nhân trực tiếp của chế độ cũ, vừa là chủ thể sáng tạo duy nhất có khả năng
                                xây dựng và vận hành chế độ mới.
                                Họ phải tự đứng lên, tự nhận thức và tự đổi mới – từ đấu tranh chính trị đến đấu tranh
                                tri thức.
                            </p>
                            <p className="text-base leading-relaxed" style={{color: '#2F2F2F', textAlign: 'justify'}}>
                                Dưới sự lãnh đạo của Đảng Cộng sản Việt Nam, giai cấp công nhân nước ta đang tiếp tục
                                thực hiện sứ mệnh ấy,
                                góp phần xây dựng một đất nước <span className="font-semibold">"dân giàu, nước mạnh, dân chủ, công bằng, văn minh."</span>
                            </p>
                        </div>
                    </div>

                    {/* Ảnh bài viết của Tổng Bí thư */}
                    <div className="mt-6">
                        <img
                            src="/images/pages/quan-diem-co-ban/page-4.png"
                            alt="Bài viết của Đại tướng, Giáo sư, Tiến sĩ Tô Lâm"
                            className="w-full rounded-lg shadow-lg"
                        />
                        <p className="text-sm mt-3 italic text-center leading-relaxed" style={{color: '#666'}}>
                            Đài Hà Nội trân trọng giới thiệu bài viết của Đại tướng, Giáo sư, Tiến sĩ Tô Lâm,
                            Tổng Bí thư Ban Chấp hành Trung ương Đảng, Chủ tịch nước Cộng hòa xã hội chủ nghĩa Việt Nam:
                            <span className="font-semibold"> "Quyết tâm xây dựng Đảng vững mạnh, nước Việt Nam giàu mạnh, dân chủ, công bằng, văn minh"</span>
                        </p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <PaginatedContent
            mainTitle="QUAN ĐIỂM CƠ BẢN CỦA CHỦ NGHĨA MÁC - LÊNIN VỀ GIAI CẤP CÔNG NHÂN VÀ SỨ MỆNH LỊCH SỬ CỦA GIAI CẤP CÔNG NHÂN"
            pages={pages}
            nextContentUrl="/giai-cap-cong-nhan-viet-nam"
            nextContentTitle="Giai cấp công nhân Việt Nam"
        />
    );
}