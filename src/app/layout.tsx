import type { Metadata, Viewport } from "next";
import { Inter, Scheherazade_New, Amiri } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { ThemeProvider } from "@/hooks/useTheme";
import { AudioProvider } from "@/hooks/useAudio";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-scheherazade",
  display: "swap",
  preload: true,
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1b5e20" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2f23" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quranonline.id"),
  title: {
    default: "Quran Online - Al-Quran Digital dengan AI Tanya Jawab & Terjemahan Indonesia",
    template: "%s | Quran Online",
  },
  description: "Baca Al-Quran online 114 surah dengan AI Tanya Jawab, terjemahan Bahasa Indonesia, audio murottal, dan fitur bookmark. Tanya apa saja tentang Al-Quran! 100% gratis.",
  keywords: [
    "quran online",
    "al-quran",
    "baca quran",
    "quran terjemahan indonesia",
    "tanya jawab quran ai",
    "chatbot quran",
    "murottal quran",
    "al quran digital",
    "quran lengkap",
    "surah al-fatihah",
    "surah yasin",
    "ngaji online",
  ],
  authors: [{ name: "Teguh Widodo", url: "https://www.linkedin.com/in/teguhwin8/" }],
  creator: "Teguh Widodo",
  publisher: "Quran Online Indonesia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://quranonline.id",
    siteName: "Quran Online",
    title: "Quran Online - Al-Quran Digital dengan AI Tanya Jawab",
    description: "Baca Al-Quran online 114 surah dengan AI Tanya Jawab, terjemahan Indonesia, audio murottal. Tanya apa saja tentang Al-Quran!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quran Online - Baca Al-Quran Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quran Online - Al-Quran Digital dengan AI",
    description: "Baca Al-Quran online dengan AI Tanya Jawab dan terjemahan Indonesia. Gratis!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://quranonline.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Quran Online",
    alternateName: "Quran Online Indonesia",
    url: "https://quranonline.id",
    description: "Baca Al-Quran online lengkap dengan terjemahan Bahasa Indonesia dan audio murottal",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://quranonline.id/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        {/* Manifest & Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        {/* Apple Icons */}
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        {/* MS Icons */}
        <meta name="msapplication-TileColor" content="#1b5e20" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        {/* Unregister old service workers for users who had PWA installed */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    registrations.forEach(function(registration) {
                      registration.unregister().then(function(success) {
                        if (success) {
                          console.log('Service worker unregistered successfully');
                        }
                      });
                    });
                  });
                  // Also clear caches
                  if ('caches' in window) {
                    caches.keys().then(function(names) {
                      names.forEach(function(name) {
                        caches.delete(name);
                      });
                    });
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${scheherazade.variable} ${amiri.variable} antialiased`}>
        <ThemeProvider>
          <AudioProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
            <Footer />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
