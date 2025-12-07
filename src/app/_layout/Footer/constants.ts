import FacebookIcon from './assets/facebook.svg';
import InstagramIcon from './assets/instagram.svg';
import TelegramIcon from './assets/telegram.svg';
import TikTokIcon from './assets/tiktok.svg';
import WhatsAppIcon from './assets/whatsapp.svg';

const INSTAGRAM_URL = 'https://www.instagram.com/';
const TELEGRAM_URL = 'https://www.telegram.com/';
const WHATSAPP_URL = 'https://www.whatsapp.com/';
const FACEBOOK_URL = 'https://www.facebook.com/';
const TIKTOK_URL = 'https://www.tiktok.com/';

export const SOCIALS = [
  {
    name: 'Instagram',
    url: INSTAGRAM_URL,
    icon: InstagramIcon.src,
  },
  {
    name: 'Telegram',
    url: TELEGRAM_URL,
    icon: TelegramIcon.src,
  },
  {
    name: 'WhatsApp',
    url: WHATSAPP_URL,
    icon: WhatsAppIcon.src,
  },
  {
    name: 'Facebook',
    url: FACEBOOK_URL,
    icon: FacebookIcon.src,
  },
  {
    name: 'TikTok',
    url: TIKTOK_URL,
    icon: TikTokIcon.src,
  },
];

export const MENU = [
  {
    title: 'Навигация',
    items: [
      {
        title: 'Меню',
        url: '/menu',
      },
      {
        title: 'Доставка и оплата',
        url: '/o-nas',
      },
      {
        title: 'Отзывы',
        url: '/politika-konfidencialnosti',
      },
    ],
  },
  {
    title: 'Меню',
    items: [
      {
        title: 'Бургеры',
        url: '/menu/burgers',
      },
      {
        title: 'Пиццы',
        url: '/menu/pizzas',
      },
    ],
  },
  // {
  //   title: 'Акции',
  //   items: [
  //     {
  //       title: 'Luna Coffee',
  //       url: '/usluga-1',
  //     },
  //   ],
  // },
];
