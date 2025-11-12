# MLN Frontend

Ứng dụng MLN hiện hỗ trợ một trợ lý Gemini trả lời câu hỏi dựa trên nội dung duy nhất của
tệp `chuong_2_su_menh_lich_su.txt`. Trợ lý xuất hiện dưới dạng bong bóng chat cố định và cũng hiển thị gợi ý câu hỏi
ngay khi bắt đầu cuộc trò chuyện.

## Cấu hình môi trường

1. Sao chép file `.env` và thêm khóa:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   VITE_GEMINI_API_KEY=<your-local-gemini-key>
   ```
2. Khi chạy GitHub Actions, biến `GEMINI_API_KEY` trong repository secrets sẽ được truyền vào bước build thông
   qua `VITE_GEMINI_API_KEY`, vì vậy không cần commit khóa.

## Lưu ý triển khai

- Tệp `chuong_2_su_menh_lich_su.txt` phải tồn tại tại thư mục gốc dự án và được nhập ở dạng `?raw`
  trong `src/lib/mission-context.ts` để đảm bảo được bundler đóng gói.
- Nếu cần seed dữ liệu mới cho trợ lý, cập nhật trực tiếp nội dung tệp văn bản trên rồi deploy lại.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used
  in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it,
see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also
install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)
for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
