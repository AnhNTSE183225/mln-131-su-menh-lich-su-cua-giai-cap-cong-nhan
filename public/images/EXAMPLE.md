# Ví Dụ Sử Dụng Hình Ảnh

## Ví dụ 1: Thêm hình vào trang Quan Điểm Cơ Bản

Trong file `src/pages/QuanDiemCoBan.tsx`:

```tsx
const pages: PageContent[] = [
    // Page 1: Khái niệm và đặc điểm
    {
        title: '1. Khái niệm và đặc điểm của giai cấp công nhân',
        imagePosition: 'top',
        imageUrl: '/images/pages/quan-diem-co-ban/page-1.jpg',
        imageSource: 'Bảo tàng Lịch sử Việt Nam',
        content: (
            <div className="space-y-8">
                {/* Nội dung hiện tại */}
            </div>
        ),
    },

    // Page 2: Nội dung sứ mệnh
    {
        title: '2. Nội dung sứ mệnh lịch sử của giai cấp công nhân',
        imagePosition: 'middle',
        imageUrl: '/images/pages/quan-diem-co-ban/page-2.jpg',
        imageSource: 'Tự thiết kế bởi nhóm',
        content: (
            <div className="space-y-6">
                {/* Nội dung hiện tại */}
            </div>
        ),
    },

    // Page 3: Điều kiện quy định
    {
        title: '3. Những điều kiện quy định và thực hiện sứ mệnh lịch sử',
        imagePosition: 'bottom',
        imageUrl: '/images/pages/quan-diem-co-ban/page-3.jpg',
        imageSource: 'Wikimedia Commons - https://commons.wikimedia.org/wiki/File:Example.jpg',
        content: (
            <div className="space-y-6">
                {/* Nội dung hiện tại */}
            </div>
        ),
    },
];
```

## Ví dụ 2: Trang không có hình (hiển thị placeholder)

```tsx
{
  title: '1. Phần này chưa có hình',
  imagePosition: 'top',  // Có vị trí nhưng không có imageUrl
  // imageUrl: undefined,  // Không cần khai báo
  // imageSource: undefined,
  content: (
    <div>Nội dung...</div>
  ),
}
```

Kết quả: Sẽ hiển thị placeholder với text "Khu vực chèn hình ảnh"

## Ví dụ 3: Trang không cần hình

```tsx
{
  title: '1. Phần này không cần hình',
  imagePosition: 'none',  // Không hiển thị hình
  content: (
    <div>Nội dung...</div>
  ),
}
```

## Nguồn Hình Ảnh Miễn Phí

Một số trang tìm hình miễn phí phù hợp:

1. **Wikimedia Commons**: https://commons.wikimedia.org
    - Hình lịch sử, tư liệu
    - License: Public Domain, CC-BY, CC-BY-SA

2. **Unsplash**: https://unsplash.com
    - Hình chất lượng cao
    - License: Free to use

3. **Pexels**: https://pexels.com
    - Hình đa dạng
    - License: Free to use

4. **Pixabay**: https://pixabay.com
    - Hình miễn phí
    - License: Pixabay License

## Ghi Nguồn Đúng Cách

### Nguồn từ Wikimedia Commons:

```
Nguồn: Wikimedia Commons - Tác giả: [Tên tác giả] - CC-BY-SA 4.0
```

### Nguồn tự làm:

```
Nguồn: Tự thiết kế bởi Nhóm [Tên nhóm]
```

### Nguồn từ Bảo tàng:

```
Nguồn: Bảo tàng Lịch sử Việt Nam - https://baotanglichsu.vn
```

### Nguồn từ website:

```
Nguồn: [Tên website] - [URL đầy đủ]
```
