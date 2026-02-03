import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/hooks/useTheme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quran Online - Baca Al-Quran Digital",
  description: "Baca Al-Quran online dengan terjemahan Bahasa Indonesia, audio murottal, dan fitur bookmark. Gratis dan mudah digunakan.",
  keywords: ["quran", "al-quran", "quran online", "baca quran", "terjemahan quran", "murottal"],
  authors: [{ name: "Quran Online" }],
  openGraph: {
    title: "Quran Online - Baca Al-Quran Digital",
    description: "Baca Al-Quran online dengan terjemahan Bahasa Indonesia dan audio murottal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var isDark = theme === 'dark' || 
                    (theme === 'system' || !theme) && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.classList.add(isDark ? 'dark' : 'light');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
