# 📄 PDFGenie - Image to PDF Converter

**PDFGenie** is a fast, lightweight, and secure web application built to convert image files (JPG, PNG) into PDF documents directly within the browser. All conversions happen entirely on the client side, ensuring that user files remain private and never leave their device.

---

## ✨ Features

- ⚡ **Instant Conversion**: Convert images to PDF in seconds.
- 🔒 **100% Secure & Private**: Client-side processing ensures files are never uploaded to any external server.
- 🖼️ **Format Support & Preview**: Supports JPG and PNG formats with live image preview before conversion.
- 🖱️ **Drag & Drop**: Easily drag and drop images or browse files from your file system.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- 📥 **One-Click Download**: Directly download the converted PDF with proper aspect-ratio scaling.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (version 18.18 or higher recommended)
- [Git](https://git-scm.com/)
- `npm` (or `yarn` / `pnpm` / `bun`)

### 2. Clone the Repository
```bash
git clone https://github.com/CodeVirtox/image-to-pdf.git
cd image-to-pdf
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Open in Browser
Open [http://localhost:3000](http://localhost:3000) in your browser to view and use the application.

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Turbopack |
| `npm run build` | Builds the production bundle |
| `npm run start` | Runs the built production application |
| `npm run lint` | Runs ESLint to check for code quality issues |

---

## 📁 Project Structure

```text
image-to-pdf/
├── public/              # Static assets & icons
├── src/
│   └── app/
│       ├── globals.css  # Global styles & Tailwind imports
│       ├── layout.tsx   # Root layout & SEO Metadata
│       └── page.tsx     # Main Image to PDF converter UI & logic
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

---

## 🤝 Contributing & License

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.
