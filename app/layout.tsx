import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '炭少年攤位互動色塊示意圖',
  description: '互動式色塊編輯器，用於設計和調整攤位配置',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
} 