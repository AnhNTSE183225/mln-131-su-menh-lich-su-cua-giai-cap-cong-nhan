import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}home_background.jpg)`,
          filter: 'brightness(0.4)',
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="max-w-3xl w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Cách Mạng Tháng Mười Nga
            </CardTitle>
            <CardDescription className="text-center text-lg mt-2">
              Kỷ Niệm Một Năm Thành Công
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg border">
                <img
                  src={`${import.meta.env.BASE_URL}home_background.jpg`}
                  alt="V.I. Lê-nin đọc diễn văn tại Quảng trường Đỏ"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 text-base leading-relaxed">
                <h3 className="font-semibold text-xl">Mô Tả Hình Ảnh:</h3>
                <p>
                  V.I. Lê-nin đọc diễn văn tại Quảng trường Đỏ ở Moskva trong Lễ kỷ niệm một năm
                  Ngày Cách mạng Tháng Mười Nga thành công, ngày 7/11/1918.
                </p>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-xl mb-3">Bối Cảnh Lịch Sử:</h3>
                  <p>
                    Cách mạng Tháng Mười Nga (còn gọi là Cách mạng Bolshevik) là sự kiện lịch sử
                    quan trọng diễn ra vào tháng 10 năm 1917, đánh dấu sự ra đời của chế độ xã hội
                    chủ nghĩa đầu tiên trên thế giới. Dưới sự lãnh đạo của V.I. Lê-nin và Đảng
                    Bolshevik, cuộc cách mạng đã lật đổ Chính phủ lâm thời và thiết lập chính quyền
                    công nông.
                  </p>
                  <p className="mt-3">
                    Lễ kỷ niệm một năm thành công của cách mạng vào ngày 7/11/1918 là dịp để nhân dân
                    Nga và các lực lượng cách mạng trên thế giới khẳng định niềm tin vào con đường xã
                    hội chủ nghĩa. Bài diễn văn của Lê-nin tại Quảng trường Đỏ trong ngày này đã truyền
                    cảm hứng cho phong trào cách mạng thế giới.
                  </p>
                </div>

                <div className="pt-4 border-t text-sm text-muted-foreground">
                  <p className="italic">Nguồn ảnh: TTXVN (Thông tấn xã Việt Nam) - Ảnh tư liệu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
