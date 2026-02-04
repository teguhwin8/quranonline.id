import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/offline",
  },
  workboxOptions: {
    runtimeCaching: [
      {
        // Cache API responses from Al-Quran Cloud
        urlPattern: /^https:\/\/api\.alquran\.cloud\/v1\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "quran-api-cache",
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        // Cache audio files
        urlPattern: /^https:\/\/cdn\.islamic\.network\/quran\/audio\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "quran-audio-cache",
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
          rangeRequests: true,
        },
      },
      {
        // Cache Google Fonts
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "google-fonts-stylesheets",
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-webfonts",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
        },
      },
      {
        // Cache Remix Icons
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/remixicon.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "remixicon-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Silence Turbopack warning since next-pwa uses webpack plugin
  turbopack: {},
};

export default withPWA(nextConfig);
