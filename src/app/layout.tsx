import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: "Abdulhameed Sherif — Full Stack Developer",
  description: "Abdulhameed Sherif — Full Stack Developer building end-to-end web applications with React, Next.js, Node.js, and TypeScript.",
  openGraph: {
    title: "Abdulhameed Sherif — Full Stack Developer",
    description: "End-to-end web apps. React, Next.js, Node.js, TypeScript.",
    type: "website",
    url: "https://beeecode.qr2tech.com/",
    images: ["/Beecode-Dp.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="https://manageull-backend.onrender.com/runtime/script" data-manageull-key="mng_site_47srnWgOTiqkyi3Vkir_RGjiwrbgtQKmqLWVBFDJTjw" data-manageull-site-verification="mng_verify_SyiecGH5QQCc0061Cve-OLplC1NySuUOmGMPc2n8Rrg" crossOrigin="anonymous" async></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

