import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  category: string;
}

const fakeComments: Comment[] = [
  {
    id: 1,
    author: 'Nguyễn Văn An',
    rating: 5,
    date: '15/03/2025',
    content:
      'Nội dung rất hay và bổ ích! Giúp tôi hiểu rõ hơn về vai trò của Cách mạng Tháng Mười đối với phong trào cách mạng thế giới. Cảm ơn đội ngũ đã tạo ra trang web này.',
    category: 'Nội dung',
  },
  {
    id: 2,
    author: 'Trần Thị Bình',
    rating: 4,
    date: '14/03/2025',
    content:
      'Giao diện đẹp và dễ sử dụng. Tuy nhiên mong muốn có thêm nhiều tài liệu tham khảo và video minh họa về các sự kiện lịch sử.',
    category: 'Giao diện',
  },
  {
    id: 3,
    author: 'Lê Minh Cường',
    rating: 5,
    date: '13/03/2025',
    content:
      'Trang trắc nghiệm rất thú vị, giúp ôn tập kiến thức một cách hiệu quả. Mong rằng sẽ có thêm nhiều câu hỏi và các cấp độ khó khác nhau.',
    category: 'Trắc nghiệm',
  },
  {
    id: 4,
    author: 'Phạm Thu Hương',
    rating: 5,
    date: '12/03/2025',
    content:
      'Xuất sắc! Các thông tin được trình bày một cách khoa học và dễ hiểu. Phần thống kê cũng rất chi tiết và hữu ích cho việc nghiên cứu.',
    category: 'Nội dung',
  },
  {
    id: 5,
    author: 'Đỗ Quang Huy',
    rating: 4,
    date: '11/03/2025',
    content:
      'Trang web tốt, nội dung chất lượng. Chỉ có điều tốc độ tải trang đôi khi hơi chậm. Ngoài ra, chatbot hỗ trợ rất nhanh và nhiệt tình.',
    category: 'Hiệu suất',
  },
  {
    id: 6,
    author: 'Vũ Thị Mai',
    rating: 5,
    date: '10/03/2025',
    content:
      'Tuyệt vời! Tài liệu phong phú, hình ảnh lịch sử quý giá. Rất phù hợp cho học sinh, sinh viên nghiên cứu về lịch sử cách mạng.',
    category: 'Nội dung',
  },
];

export function Comments() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Nhận Xét & Phản Hồi</h1>
          <p className="text-muted-foreground text-lg">
            Ý kiến của người dùng về nội dung và trải nghiệm
          </p>
        </div>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Tổng Quan Đánh Giá</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">4.7</div>
                <div className="flex justify-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Trung bình</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{fakeComments.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Tổng đánh giá</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <p className="text-sm text-muted-foreground mt-1">Hài lòng 12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {fakeComments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {comment.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{comment.author}</CardTitle>
                      <CardDescription>{comment.date}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{comment.category}</Badge>
                </div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= comment.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
