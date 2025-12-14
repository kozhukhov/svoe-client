import { RestaurantDTO } from 'modules/restaurant/dto';

// import FacebookIcon from './assets/facebook.svg';
import InstagramIcon from './assets/instagram.svg';
// import TelegramIcon from './assets/telegram.svg';
// import TikTokIcon from './assets/tiktok.svg';
import VkIcon from './assets/vk.svg';
// import WhatsAppIcon from './assets/whatsapp.svg';

export const getSocials = (restaurant: RestaurantDTO) => {
  const result = [];

  if (restaurant?.instagramUrl) {
    result.push({
      name: 'Instagram',
      url: restaurant.instagramUrl,
      icon: InstagramIcon.src,
    });
  }

  if (restaurant?.vkUrl) {
    result.push({
      name: 'VK',
      url: restaurant.vkUrl,
      icon: VkIcon.src,
    });
  }

  return result;
};

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
