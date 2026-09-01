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
        <script data-manageull-site-verification="mng_site_yv1R8flfSvAd2Gm-uwXZ1GAU1byyPldydHxR9QrEXyQ"></script>
        <script src="http://localhost:4100/runtime/script" data-manageull-key="mng_site_yv1R8flfSvAd2Gm-uwXZ1GAU1byyPldydHxR9QrEXyQ" crossOrigin="anonymous" async></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
