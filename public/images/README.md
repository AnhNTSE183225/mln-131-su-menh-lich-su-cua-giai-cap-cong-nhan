# Hướng Dẫn Sử Dụng Hình Ảnh

## 📁 Cấu Trúc Thư Mục

```
/public/images/
├── pages/                          # Hình ảnh cho các trang nội dung
│   ├── quan-diem-co-ban/          # Trang Quan Điểm Cơ Bản
│   │   ├── page-1.jpg             # Hình cho phần 1
│   │   ├── page-2.jpg             # Hình cho phần 2
│   │   ├── page-3.jpg             # Hình cho phần 3
│   │   └── sources.txt            # File ghi nguồn
│   ├── giai-cap-cn-hien-nay/      # Trang Giai Cấp Công Nhân Hiện Nay
│   └── giai-cap-cn-vn/            # Trang Giai Cấp Công Nhân Việt Nam
├── backgrounds/                    # Ảnh nền
│   ├── home.jpg
│   ├── content.jpg
│   └── sources.txt
└── shared/                         # Hình ảnh dùng chung
    └── ...
```

## 🖼️ Yêu Cầu Hình Ảnh

### Kích thước và định dạng

- **Độ phân giải tối thiểu**: 1200x800px
- **Định dạng khuyến nghị**: .jpg, .webp, .png
- **Kích thước file**: < 500KB (nên optimize trước khi upload)

### Nội dung hình ảnh

- Phù hợp với chủ đề lịch sử, giai cấp công nhân
- Rõ nét, chất lượng cao
- Không vi phạm bản quyền

## 📝 Cách Sử Dụng

### Bước 1: Thêm hình ảnh vào thư mục

Đặt file hình vào thư mục tương ứng với tên đúng format:

- `page-1.jpg`, `page-2.jpg`, `page-3.jpg`

### Bước 2: Ghi nguồn trong sources.txt

Mở file `sources.txt` trong thư mục và ghi nguồn:

```txt
# page-1.jpg: Bảo tàng Lịch sử Việt Nam - https://example.com/image
# page-2.jpg: Tự thiết kế bởi Nhóm X
# page-3.jpg: Wikimedia Commons - https://commons.wikimedia.org/...
```

### Bước 3: Thêm vào code

Trong file trang (ví dụ: `QuanDiemCoBan.tsx`):

```tsx
const pages: PageContent[] = [
    {
        title: '1. Khái niệm và đặc điểm của giai cấp công nhân',
        imagePosition: 'top',
        imageUrl: '/images/pages/quan-diem-co-ban/page-1.jpg',
        imageSource: 'Bảo tàng Lịch sử Việt Nam',
        content: (
            // ... nội dung
        ),
    },
    // ...
];
```

## 🎨 Vị Trí Hình Ảnh

Có 4 vị trí có thể đặt hình:

1. **`'top'`**: Phía trên nội dung
2. **`'middle'`**: Giữa nội dung
3. **`'bottom'`**: Phía dưới nội dung
4. **`'none'`**: Không hiển thị hình

## ✅ Checklist

- [ ] Đặt hình vào đúng thư mục
- [ ] Đặt tên file đúng format (page-1.jpg, page-2.jpg...)
- [ ] Ghi nguồn trong sources.txt
- [ ] Thêm imageUrl và imageSource vào code
- [ ] Kiểm tra hình hiển thị đúng trên web
- [ ] Verify nguồn hiển thị ở dưới hình

## 💡 Tips

1. **Optimize hình ảnh**: Dùng tools như TinyPNG, Squoosh để giảm dung lượng
2. **Chọn hình phù hợp**: Nên chọn hình có tone màu phù hợp với theme (nâu, vàng đồng)
3. **Backup nguồn**: Lưu link nguồn gốc đầy đủ trong sources.txt

## ⚠️ Lưu Ý

- Nếu không có hình, hệ thống sẽ hiển thị placeholder
- Nếu hình lỗi (không load được), sẽ hiển thị thông báo lỗi
- Luôn ghi rõ nguồn để tránh vi phạm bản quyền
