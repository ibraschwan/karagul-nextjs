import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Karagül Ajans - Türkiye'nin İşletme Rehberi",
  description: "Türkiye'nin en kapsamlı işletme rehberi. İşletmenizi ücretsiz kaydedin, müşterilerinizle buluşun.",
  keywords: "işletme rehberi, firma rehberi, işletme kaydı, müşteri bulma, reklam",
  authors: [{ name: "Karagül Ajans" }],
  creator: "Karagül Ajans",
  publisher: "Karagül Ajans",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://karagulajans.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    title: 'Karagül Ajans - Türkiye\'nin İşletme Rehberi',
    description: 'Türkiye\'nin en kapsamlı işletme rehberi. İşletmenizi ücretsiz kaydedin, müşterilerinizle buluşun.',
    siteName: 'Karagül Ajans',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karagül Ajans - Türkiye\'nin İşletme Rehberi',
    description: 'Türkiye\'nin en kapsamlı işletme rehberi. İşletmenizi ücretsiz kaydedin, müşterilerinizle buluşun.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
