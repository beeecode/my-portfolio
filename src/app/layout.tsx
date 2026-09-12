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
        {/*
          Manageull runtime. The script derives the API origin from its own `src`, so this host must
          match PUBLIC_MANAGEULL_SCRIPT_CDN_URL in the Manageull dashboard.

          TODO: this Quick Tunnel address is dead — Cloudflare Quick Tunnels get a new hostname on
          every restart, so published edits stop reaching this page. Replace it with a stable public
          URL for the backend (named Cloudflare tunnel, ngrok static domain, or a real deployment).

          `crossOrigin` is camelCase because this is JSX; the lowercase HTML spelling the dashboard
          emits is a TypeScript error (TS2322) and fails the build.
        */}
        <script src="https://manageull-backend.onrender.com/runtime/script" data-manageull-key="mng_site_NK9QPVUdnWhFscAij842W4cJVmjKOn7eq1eXueHroDQ" crossOrigin="anonymous" async></script>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

