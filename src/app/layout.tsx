import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Md Shahin | Creative Frontend Developer & UI/UX Architect",
  description: "MD Shahin's personal developer portfolio. Crafting modern web experiences with React, Next.js, and creative UI engineering, featuring floating anti-gravity visual effects.",
  keywords: [
    "Md Shahin",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Creative Developer",
    "UI/UX Architect",
    "Web Portfolio",
    "Framer Motion Portfolio",
    "Anti-Gravity UI",
  ],
  authors: [{ name: "Md Shahin" }],
  openGraph: {
    title: "Md Shahin | Creative Frontend Developer",
    description: "Crafting modern web experiences with React, Next.js, and creative UI engineering.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Shahin | Creative Frontend Developer",
    description: "Crafting modern web experiences with React, Next.js, and creative UI engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans select-none overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
