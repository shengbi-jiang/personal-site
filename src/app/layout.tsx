import type { Metadata } from 'next';
import { notoSansTC } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: "Alan Jiang' Blog",
  description: "Alan Jiang' Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSansTC.className}>{children}</body>
    </html>
  );
}
