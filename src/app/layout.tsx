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
  <script data-manageull-site-verification="mng_verify__zxQN0VYmey0r5-Jq5DJ40L5R6trm43UdphOii4fT0E"></script>

  <script
    src="https://radical-tool-common-adrian.trycloudflare.com/runtime/script"
    data-manageull-key="YOUR_EXISTING_MNG_SITE_KEY"
    crossOrigin="anonymous"
    async
  ></script>

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
  />
</head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

