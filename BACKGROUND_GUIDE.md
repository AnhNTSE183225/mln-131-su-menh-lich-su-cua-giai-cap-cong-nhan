# Hướng Dẫn Sử Dụng Ảnh Nền (Background Images)

## 📸 Ảnh Nền Đã Được Tích Hợp

Website hiện đã có hệ thống ảnh nền động, tự động thay đổi theo từng trang:

### Danh Sách Ảnh Nền Theo Route

| Trang | Route | File Ảnh | Nguồn |
|-------|-------|----------|-------|
| Trang Chủ | `/` | `home_background.jpg` | - |
| Quan Điểm Cơ Bản | `/quan-diem-co-ban` | `content_1.png` | Gemini AI |
| Giai Cấp CN Hiện Nay | `/giai-cap-cong-nhan-hien-nay` | `content_2.png` | Gemini AI |
| Giai Cấp CN Việt Nam | `/giai-cap-cong-nhan-viet-nam` | `content_3.png` | Tạp chí Tuyên giáo |
| Quiz | `/quiz` | `quiz.png` | thechap.co.uk |
| Câu Hỏi Ôn Tập | `/cau-hoi-on-tap` | `content_1.png` | Gemini AI |

## 🎨 Tính Năng

1. **Background tự động thay đổi**: Mỗi trang có ảnh nền riêng
2. **Overlay tối**: Lớp phủ tối 85% để đảm bảo text dễ đọc
3. **Blur effect**: Hiệu ứng mờ nhẹ (`backdrop-blur-sm`)
4. **Fixed attachment**: Ảnh nền cố định khi scroll
5. **Footer credits**: Tự động hiển thị nguồn ảnh ở footer

## 🔧 Cách Thay Đổi Ảnh Nền

### 1. Thêm/Thay đổi ảnh nền cho một route

File: `src/components/Layout.tsx`

```tsx
const BACKGROUND_MAP: Record<string, string> = {
  '/': '/images/backgrounds/home_background.jpg',
  '/quan-diem-co-ban': '/images/backgrounds/content_1.png',
  // Thêm route mới
  '/trang-moi': '/images/backgrounds/trang_moi.jpg',
};
```

### 2. Thêm nguồn ảnh vào footer

File: `src/components/Footer.tsx`

```tsx
const BACKGROUND_CREDITS: Record<string, string> = {
  '/': 'Ảnh nền trang chủ',
  '/quan-diem-co-ban': 'Nguồn ảnh nền: Tạo bởi Gemini...',
  // Thêm credit cho route mới
  '/trang-moi': 'Nguồn ảnh nền: [Ghi nguồn ở đây]',
};
```

## ⚙️ Tùy Chỉnh Hiệu Ứng

### Điều chỉnh độ tối của overlay

File: `src/components/Layout.tsx` (dòng 42)

```tsx
{/* Overlay tối - điều chỉnh ở đây */}
<div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
```

**Các mức độ tối:**
- `bg-background/70` - Sáng hơn (70% opacity)
- `bg-background/85` - Mặc định (85% opacity)
- `bg-background/90` - Tối hơn (90% opacity)
- `bg-background/95` - Rất tối (95% opacity)

### Điều chỉnh blur effect

```tsx
<div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
```

**Các mức độ blur:**
- `backdrop-blur-none` - Không blur
- `backdrop-blur-sm` - Blur nhẹ (mặc định)
- `backdrop-blur` - Blur trung bình
- `backdrop-blur-md` - Blur mạnh
- `backdrop-blur-lg` - Blur rất mạnh

### Thay đổi background properties

File: `src/components/Layout.tsx` (dòng 33-39)

```tsx
style={{
  backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'none',
  backgroundSize: 'cover',        // cover, contain, auto
  backgroundPosition: 'center',    // top, center, bottom, left, right
  backgroundAttachment: 'fixed',   // fixed, scroll
  backgroundRepeat: 'no-repeat',   // no-repeat, repeat
}}
```

## 📝 Checklist Thêm Ảnh Nền Mới

- [ ] Đặt file ảnh vào `/public/images/backgrounds/`
- [ ] Ghi nguồn trong `/public/images/backgrounds/sources.txt`
- [ ] Thêm route vào `BACKGROUND_MAP` trong `Layout.tsx`
- [ ] Thêm credit vào `BACKGROUND_CREDITS` trong `Footer.tsx`
- [ ] Test trên browser: kiểm tra ảnh hiển thị đúng
- [ ] Kiểm tra text có dễ đọc không (có thể cần adjust overlay)

## 💡 Tips

1. **Chọn ảnh phù hợp**: Nên chọn ảnh có tone màu tối, phù hợp với theme
2. **Optimize ảnh**: Nén ảnh trước khi upload (< 500KB)
3. **Test readability**: Đảm bảo text dễ đọc trên background
4. **Consistent style**: Các ảnh nên có style nhất quán (cùng tone màu, cùng thời đại)

## 🔍 Troubleshooting

**Ảnh không hiển thị:**
1. Kiểm tra đường dẫn trong `BACKGROUND_MAP`
2. Kiểm tra file có tồn tại trong `/public/images/backgrounds/`
3. Refresh trình duyệt (Ctrl + F5)

**Text khó đọc:**
1. Tăng opacity của overlay: `bg-background/90` hoặc `bg-background/95`
2. Tăng blur: `backdrop-blur-md`
3. Thay ảnh nền tối hơn

**Ảnh load chậm:**
1. Optimize/nén ảnh
2. Đổi format sang .webp
3. Giảm resolution (không quá 1920px chiều rộng)
