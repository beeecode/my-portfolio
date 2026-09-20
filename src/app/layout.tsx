import type { Metadata } from "next";
import "../index.css";
import { getPublishedPage } from '../lib/manageull/server';
import { manageullConfig } from '../lib/manageull/config';
import { PublishedContentProvider } from '../components/manageull/PublishedContent';
import { EditorBridge } from '../components/manageull/EditorBridge';

const defaultMetadata: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedPage();
  if (!content) return defaultMetadata;
  const editedValue = (type: string) => content.elements.find((element) => element.type === type && element.contentChanged)?.currentValue;
  const title = editedValue('META_TITLE') ?? content.page.seoTitle ?? defaultMetadata.title;
  const description = editedValue('META_DESCRIPTION') ?? content.page.seoDescription ?? defaultMetadata.description;
  return {
    ...defaultMetadata,
    title,
    description,
    alternates: content.page.canonicalUrl ? { canonical: content.page.canonicalUrl } : undefined,
    openGraph: { ...defaultMetadata.openGraph, title, description, ...(content.page.canonicalUrl ? { url: content.page.canonicalUrl } : {}) },
    twitter: { card: 'summary_large_image', title, description, images: ['/Beecode-Dp.jpg'] },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getPublishedPage();
  return (
    <html lang={content?.page.language ?? 'en'} className="scroll-smooth" data-manageull-ssr="true" data-manageull-version={content?.version.id}>
      <head>
        <meta name="manageull-site-verification" content={manageullConfig.verification} />
        <noscript><style>{'[style*="opacity:0"]{opacity:1!important;transform:none!important}'}</style></noscript>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="antialiased">
        <PublishedContentProvider page={content}>{children}</PublishedContentProvider>
        <EditorBridge origin={manageullConfig.origin} siteKey={manageullConfig.siteKey} verification={manageullConfig.verification} />
      </body>
    </html>
  );
}

