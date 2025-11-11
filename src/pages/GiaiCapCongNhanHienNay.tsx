import { PaginatedContent, type PageContent } from '@/components/PaginatedContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function GiaiCapCongNhanHienNay() {
  const pages: PageContent[] = [
    // Page 1: Giai cấp công nhân hiện nay
    {
      title: '1. Giai cấp công nhân hiện nay',
      imagePosition: 'top',
      imageComparison: {
        image1: {
          url: '/images/pages/giai-cap-cn-hien-nay/page_1_1.png',
          label: 'Công nhân thế kỷ XIX',
          source: 'Người lao động đã từng phải làm việc rất vất vả cho các xí nghiệp tư bản - Ảnh: Internet',
        },
        image2: {
          url: '/images/pages/giai-cap-cn-hien-nay/page_1_2.png',
          label: 'Công nhân hiện đại',
          source: 'Người lao động ngày nay làm việc với trang thiết bị công nghệ hiện đại - Ảnh: joydo/@Canva.com',
        },
        title: 'So sánh: Giai cấp công nhân qua các thời kỳ',
      },
      content: (
        <div className="space-y-6">
          <div className="bg-[#2F2622] p-5 rounded-lg border-l-4 border-[#8B1E1E]">
            <p className="text-base text-[#E6DCCF] leading-relaxed">
              So với giai cấp công nhân truyền thống ở thế kỷ XIX thì giai cấp công nhân hiện nay vừa có những điểm <span className="font-semibold">tương đồng</span>,
              vừa có những điểm <span className="font-semibold">khác biệt</span>, có những biến đổi mới trong điều kiện lịch sử mới. Làm rõ những điểm tương đồng và khác biệt
              đó theo quan điểm lịch sử - cụ thể của chủ nghĩa Mác - Lênin để một mặt khẳng định những giá trị của chủ nghĩa Mác - Lênin,
              mặt khác để bổ sung, phát triển nhận thức mới về việc thực hiện sứ mệnh lịch sử của giai cấp công nhân hiện nay.
            </p>
          </div>

          <div className="bg-[#2F2622] p-6 rounded-lg border border-[#DAA520]/40">
            <h3 className="text-xl font-semibold mb-4 text-[#DAA520]">a) Về những điểm tương đối ổn định so với thế kỷ XIX</h3>
            <div className="space-y-4">
              <div className="bg-[#26201D] p-4 rounded-lg border-l-4 border-[#DAA520]">
                <p className="text-base text-[#E6DCCF] leading-relaxed">
                  Giai cấp công nhân hiện nay vẫn đang là <span className="font-semibold">lực lượng sản xuất hàng đầu</span> của xã hội hiện đại. Họ là <span className="font-semibold">chủ thể của quá trình
                  sản xuất công nghiệp hiện đại</span> mang tính xã hội hóa ngày càng cao. Ở các nước phát triển, sự phát triển của giai cấp công nhân
                  tỷ lệ thuận với sự phát triển kinh tế.
                </p>
              </div>
              <div className="bg-[#26201D] p-4 rounded-lg border-l-4 border-[#DAA520]">
                <p className="text-base text-[#E6DCCF] leading-relaxed">
                  Cũng giống như thế kỷ XIX, ở các nước tư bản chủ nghĩa hiện nay, công nhân vẫn bị giai cấp tư sản và chủ nghĩa tư bản <span className="font-semibold">bóc lột giá trị
                  thặng dư</span>. Quan hệ sản xuất tư bản chủ nghĩa với chế độ sở hữu tư nhân tư bản chủ nghĩa sản sinh ra tình trạng bóc lột này vẫn tồn tại.
                </p>
              </div>
              <div className="bg-[#3A2D1F] p-4 rounded-lg border-l-4 border-[#8B1E1E]">
                <p className="text-base text-[#E6DCCF] leading-relaxed font-semibold">
                  Từ những điểm tương đồng đó của công nhân hiện đại so với công nhân thế kỷ XIX, có thể khẳng định: Lý luận về sứ mệnh lịch sử của giai cấp
                  công nhân trong chủ nghĩa Mác - Lênin vẫn mang <span className="text-[#DAA520]">giá trị khoa học và cách mạng</span>, vẫn có ý nghĩa thực tiễn to lớn.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#2F2622] p-6 rounded-lg border border-[#8B1E1E]/60">
            <h3 className="text-xl font-semibold mb-4 text-[#A52A2A]">b) Những biến đổi và khác biệt của giai cấp công nhân hiện đại</h3>
            <div className="space-y-5">
              <div className="bg-[#26201D] p-5 rounded-lg border-l-4 border-[#C2B280]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-[#C2B280] rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1A1512]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-3 text-[#C2B280]">Xu hướng "trí tuệ hóa" tăng nhanh</h4>
                    <div className="space-y-3">
                      <p className="text-base text-[#E6DCCF] leading-relaxed">
                        Gắn liền với <span className="font-semibold">cách mạng khoa học và công nghệ hiện đại</span>, với sự phát triển kinh tế tri thức, công nhân hiện đại có xu hướng <span className="font-semibold">trí tuệ hóa</span>.
                        Tri thức hóa và trí thức hóa công nhân là hai mặt của cùng một quá trình, của xu hướng trí tuệ hóa đối với công nhân và giai cấp công nhân.
                      </p>
                      <p className="text-base text-[#E6DCCF] leading-relaxed">
                        Ngày nay, công nhân được <span className="font-semibold">đào tạo chuẩn mực</span> và thường xuyên được đào tạo lại, đáp ứng sự thay đổi nhanh chóng của công nghệ trong nền sản xuất.
                        Hao phí lao động hiện đại chủ yếu là <span className="font-semibold">hao phí về trí lực</span> chứ không còn thuần túy là hao phí sức lực cơ bắp.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#26201D] p-5 rounded-lg border-l-4 border-[#8B6914]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-[#8B6914] rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-[#E6DCCF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-3 text-[#8B6914]">Xu hướng "trung lưu hóa" gia tăng</h4>
                    <div className="space-y-3">
                      <p className="text-base text-[#E6DCCF] leading-relaxed">
                        Trong bối cảnh <span className="font-semibold">toàn cầu hóa</span>, chủ nghĩa tư bản đã có một số điều chỉnh nhất định về phương thức quản lý, các biện pháp điều hòa mâu thuẫn xã hội.
                        Một bộ phận công nhân đã tham gia vào sở hữu một lượng tư liệu sản xuất của xã hội thông qua <span className="font-semibold">chế độ cổ phần hóa</span>.
                      </p>
                      <p className="text-base text-[#E6DCCF] leading-relaxed">
                        Cần hiểu rằng, khi sở hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất vẫn tồn tại thì những thành quả của khoa học và công nghệ, trình độ kinh tế
                        tri thức và những điều chỉnh về thể chế quản lý kinh tế và xã hội... trước tiên vẫn là <span className="font-semibold">công cụ để bóc lột giá trị thặng dư</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Page 2: Thực hiện sứ mệnh lịch sử của giai cấp công nhân trên thế giới hiện nay
    {
      title: '2. Thực hiện sứ mệnh lịch sử của giai cấp công nhân trên thế giới hiện nay',
      imagePosition: 'bottom',
      imageUrl: '/images/pages/giai-cap-cn-hien-nay/page_2.png',
      imageSource: 'Ngày Quốc tế Lao động bắt nguồn từ sự kiện Haymarket ở thành phố Chicago, Mỹ, diễn ra từ ngày 01 đến ngày 04/5/1886 - Ảnh: Internet',
      content: (
        <div className="space-y-6">
          <div className="bg-[#2F2622] p-6 rounded-lg border-l-4 border-[#DAA520]">
            <h3 className="text-xl font-semibold mb-4 text-[#DAA520]">a) Nội dung kinh tế</h3>
            <div className="space-y-4">
              <div className="bg-[#26201D] p-4 rounded-lg">
                <p className="text-base text-[#E6DCCF] leading-relaxed">
                  Thông qua vai trò của giai cấp công nhân trong quá trình sản xuất với <span className="font-semibold">công nghệ hiện đại, năng suất, chất lượng cao</span>, đảm bảo cho phát triển bền vững,
                  sứ mệnh lịch sử của giai cấp công nhân đối với sự phát triển xã hội ngày càng thể hiện rõ, bởi sự phát triển sản xuất của chủ nghĩa tư bản trong thế giới
                  ngày nay với sự tham gia trực tiếp của giai cấp công nhân và các lực lượng lao động - dịch vụ trình độ cao lại chính là <span className="font-semibold">nhân tố kinh tế - xã hội thúc đẩy
                  sự chín muồi các tiền đề của chủ nghĩa xã hội</span> trong lòng chủ nghĩa tư bản.
                </p>
              </div>
              <div className="bg-[#26201D] p-4 rounded-lg">
                <p className="text-base text-[#E6DCCF] leading-relaxed">
                  Mặt khác, <span className="font-semibold">mâu thuẫn lợi ích cơ bản</span> giữa giai cấp công nhân với giai cấp tư sản cũng ngày càng sâu sắc ở từng quốc gia và trên phạm vi toàn cầu. Toàn cầu
                  hóa hiện nay vẫn mang đậm tính chất tư bản chủ nghĩa với những <span className="font-semibold">bất công và bất bình đẳng xã hội</span> lại thúc đẩy cuộc đấu tranh chống chế độ bóc lột giá trị
                  thặng dư trên phạm vi thế giới.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#2F2622] p-6 rounded-lg border-l-4 border-[#8B1E1E]">
            <h3 className="text-xl font-semibold mb-4 text-[#A52A2A]">b) Nội dung chính trị - xã hội</h3>
            <div className="bg-[#26201D] p-4 rounded-lg">
              <p className="text-base text-[#E6DCCF] leading-relaxed">
                Ở các nước tư bản chủ nghĩa, mục tiêu đấu tranh trực tiếp của giai cấp công nhân và nhân dân lao động là <span className="font-semibold">chống bất công và bất bình đẳng xã hội</span>; mục tiêu
                lâu dài là <span className="font-semibold">giành chính quyền về tay giai cấp công nhân và nhân dân lao động</span>, được nêu rõ trong Cương lĩnh chính trị của các Đảng Cộng sản trong các nước
                tư bản chủ nghĩa. Đối với các nước xã hội chủ nghĩa, nơi các Đảng Cộng sản đã trở thành đảng cầm quyền, sứ mệnh lịch sử của giai cấp công nhân là <span className="font-semibold">lãnh đạo
                thành công sự nghiệp đổi mới</span>, giải quyết thành công các nhiệm vụ trong thời kỳ quá độ lên chủ nghĩa xã hội.
              </p>
            </div>
          </div>

          <div className="bg-[#2F2622] p-6 rounded-lg border-l-4 border-[#C2B280]">
            <h3 className="text-xl font-semibold mb-4 text-[#C2B280]">c) Nội dung văn hóa, tư tưởng</h3>
            <div className="space-y-4">
              <div className="bg-[#26201D] p-4 rounded-lg">
                <p className="text-base text-[#E6DCCF] leading-relaxed">
                  Thực hiện sứ mệnh lịch sử của giai cấp công nhân trong điều kiện thế giới ngày nay trên lĩnh vực văn hóa, tư tưởng trước hết là <span className="font-semibold">cuộc đấu tranh ý thức hệ</span>,
                  đó là cuộc đấu tranh giữa chủ nghĩa xã hội với chủ nghĩa tư bản. Cuộc đấu tranh này đang diễn ra <span className="font-semibold">phức tạp và quyết liệt</span>, nhất là trong nền kinh tế thị trường
                  phát triển với những tác động mặt trái của nó.
                </p>
              </div>
              <div className="bg-[#26201D] p-4 rounded-lg">
                <p className="text-base text-[#E6DCCF] leading-relaxed">
                  Các giá trị như <span className="font-semibold">lao động, sáng tạo, công bằng, dân chủ, bình đẳng, tự do</span> vẫn là những giá trị được nhân loại thừa nhận và phấn đấu thực hiện. Trên thực tế,
                  các giá trị mà nhân loại hướng tới đều tương đồng với các giá trị lý tưởng, mục tiêu của giai cấp công nhân.
                </p>
              </div>
              <div className="bg-[#3A2D1F] p-4 rounded-lg border-l-4 border-[#DAA520]">
                <p className="text-base text-[#E6DCCF] leading-relaxed">
                  Đấu tranh để <span className="font-semibold">bảo vệ nền tảng tư tưởng của Đảng Cộng sản</span>, giáo dục nhận thức và củng cố niềm tin khoa học đối với lý tưởng, mục tiêu của chủ nghĩa xã hội cho
                  giai cấp công nhân và nhân dân lao động, giáo dục và thực hiện <span className="font-semibold">chủ nghĩa quốc tế chân chính</span> của giai cấp công nhân trên cơ sở phát huy chủ nghĩa yêu nước và
                  tinh thần dân tộc chính là nội dung sứ mệnh lịch sử của giai cấp công nhân hiện nay về văn hóa tư tưởng.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PaginatedContent
      mainTitle="GIAI CẤP CÔNG NHÂN VÀ VIỆC THỰC HIỆN SỨ MỆNH LỊCH SỬ CỦA GIAI CẤP CÔNG NHÂN HIỆN NAY"
      pages={pages}
      nextContentUrl="/quiz"
      nextContentTitle="Câu hỏi ôn tập"
    />
  );
}
