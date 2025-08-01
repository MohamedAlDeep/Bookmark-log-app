# 📚 Bookmark Log App

A modern, responsive web application for managing your personal book collection. Keep track of all the books you've read, organize them with tags, and easily access them with both online and local file support.

![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **📖 Book Management**: Add, view, and delete books from your personal collection
- **🔍 Smart Search**: Search through your books by title, author, or tags
- **🏷️ Tag System**: Organize books with custom tags for easy categorization
- **🔗 Flexible Links**: Support for both online URLs and local file paths
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **💾 Local Storage**: All data is stored locally in your browser
- **🌙 Modern UI**: Clean, accessible interface built with Radix UI components
- **⚡ Fast Performance**: Built with Next.js for optimal performance
- **📋 Toast Notifications**: User-friendly feedback for all actions

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohamedAlDeep/Bookmark-log-app.git
   cd Bookmark-log-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting

## 📖 How to Use

### Adding a Book

1. Click the **"Add Book"** button in the top-right corner
2. Fill in the required information:
   - **Title** (required): The book's title
   - **Author** (required): The author's name
   - **Description** (optional): Your thoughts or a brief description
   - **Link** (required): URL or local file path to the book
   - **Tags** (optional): Comma-separated tags for organization
3. Click **"Add Book"** to save

### Managing Your Collection

- **Search**: Use the search bar to find books by title, author, or tags
- **Open Book**: Click the "Open Book" button to access your book
  - Online links open in a new tab
  - Local file paths are copied to your clipboard
- **Delete**: Click the trash icon to remove a book from your collection

### Link Types Supported

- **Online URLs**: `https://example.com/book.pdf`
- **Local Windows paths**: `C:\Books\mybook.pdf`
- **Local Unix/Mac paths**: `/home/user/books/mybook.pdf`
- **Relative paths**: `./books/mybook.pdf`

## 🏗️ Tech Stack

- **Frontend Framework**: [Next.js 15.2](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📁 Project Structure

```
Bookmark Log App/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── loading.tsx        # Loading component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── theme-provider.tsx # Theme provider
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
├── components.json       # Component configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Configuration

The application uses several configuration files:

- **`next.config.mjs`**: Next.js configuration with optimizations
- **`tailwind.config.ts`**: Tailwind CSS theming and styling
- **`components.json`**: UI components configuration
- **`tsconfig.json`**: TypeScript compiler options

## 💾 Data Storage

All book data is stored locally in your browser's localStorage. This means:
- ✅ No server required - works offline
- ✅ Fast performance - no network requests
- ✅ Privacy-focused - data never leaves your device
- ⚠️ Data is tied to your browser and domain
- ⚠️ Clearing browser data will remove your books

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mohamed Al Deep**
- GitHub: [@MohamedAlDeep](https://github.com/MohamedAlDeep)

## 🙏 Acknowledgments

- Built with [v0.dev](https://v0.dev/) for rapid prototyping
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons provided by [Lucide](https://lucide.dev/)

---

**Happy Reading! 📚✨**
