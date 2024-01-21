import type { Metadata } from 'next';
import { notoSansTC } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: "Alan Jiang's Site",
  description: "Alan Jiang's Site",
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
