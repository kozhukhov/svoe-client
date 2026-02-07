import React, { Suspense } from 'react';
import { SWRConfigProvider } from 'lib/providers/SWRConfigProvider';
import { ThemeProvider } from 'lib/providers/ThemeProvider';
import { StyledComponentsRegistry } from 'lib/registries/StyledComponentsRegistry';
import type { Metadata, Viewport } from 'next';
import { Jost } from 'next/font/google';
import Script from 'next/script';

import { Application } from './_layout/Application';

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
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'Доставка пиццы, суши, бургеров и гарниров - кафе SVOE',
  description:
    'Кафе «SVOE» – это быстрая доставка пиццы, суши, бургеров, картофеля фри и напитков. Нашими отличительными особенностями являются: – ассортимент и вкус наших блюд, который порадует даже самых избирательных гурманов; – приветливый персонал. Нам очень важно, чтоб вы были довольны и сохранили хорошее настроение от момента заказа до последнего съеденного ролла, кусочка пиццы или бургера; – четкая и быстрая доставка без опозданий; – мы всегда тщательно упаковываем заказ. Можете быть уверены в целости и сохранности заказанного блюда; – предоставляем скидку на самовывоз, а также в день рождения(+7 дней после). Делайте заказ в «SVOE» и Вы точно не останетесь разочарованы и захотите попробовать что-то ещё.',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/next.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'Vdfv5GD9kS9jNGO_0VmQLMQ9E-uxQfSUFUszIHX2_Jo',
    yandex: 'd1957b21a58cfddb',
    other: {
      'facebook-domain-verification': '5um2i7xj3h4s6owvn20fj1kwhgpah7',
    },
  },
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
        {/* Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HSNKHCEMYM"
          strategy="afterInteractive"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HSNKHCEMYM', { currency: 'BYN' });
              window.gtag = gtag;
            `,
          }}
          id="gtag-init"
          strategy="afterInteractive"
        />

        {/* Yandex Metrika */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              (function (m, e, t, r, i, k, a) {
                m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
                m[i].l = 1 * new Date();
                k = e.createElement(t);
                a = e.getElementsByTagName(t)[0];
                k.async = 1;
                k.src = r;
                a.parentNode.insertBefore(k, a);
              })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

              ym(70577224, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
              });
            `,
          }}
          id="yandex-metrika"
          strategy="afterInteractive"
        />

        {/* VK Retargeting */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var t = document.createElement('script');
                t.type = 'text/javascript';
                t.async = true;
                t.src = 'https://vk.com/js/api/openapi.js?169';
                t.onload = function () {
                  VK.Retargeting.Init('VK-RTRG-1036900-ay1GG');
                  VK.Retargeting.Hit();
                };
                document.head.appendChild(t);
              })();
            `,
          }}
          id="vk-retargeting"
          strategy="afterInteractive"
        />

        {/* Meta Pixel Code */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return; n=f.fbq=function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments) };
                if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
                n.queue=[]; t=b.createElement(e); t.async=!0;
                t.src=v; s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '546945473977651');
              fbq('track', 'PageView');
            `,
          }}
          id="facebook-pixel"
          strategy="afterInteractive"
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-53WD447"
            style={{ display: 'none', visibility: 'hidden' }}
            width="0"
          />
        </noscript>

        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            alt=""
            height="1"
            src="https://www.facebook.com/tr?id=546945473977651&ev=PageView&noscript=1"
            style={{ display: 'none' }}
            width="1"
          />
        </noscript>

        <StyledComponentsRegistry>
          <ThemeProvider>
            <SWRConfigProvider>
              <Suspense fallback={<></>}>
                <Application>{children}</Application>
              </Suspense>
            </SWRConfigProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
