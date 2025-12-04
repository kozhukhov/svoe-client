import React, { Suspense } from 'react';
import { ThemeProvider } from 'lib/providers/ThemeProvider';
import { StyledComponentsRegistry } from 'lib/registries/StyledComponentsRegistry';
import type { Metadata, Viewport } from 'next';
import { Jost } from 'next/font/google';

const font = Jost({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'fallback',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#151b2d',
};

export const metadata: Metadata = {
  title: 'Svoe Admin Panel',
  description: '',
};

const style = {
  height: '100%',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={font.className} style={style}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <Suspense fallback={<></>}>SVOE CAFE{children}</Suspense>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
