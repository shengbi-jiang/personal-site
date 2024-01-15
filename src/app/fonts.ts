import { Noto_Sans_TC, Roboto_Mono } from 'next/font/google';

export const notoSansTC = Noto_Sans_TC({
  weight: ['200', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const robotoMono = Roboto_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
