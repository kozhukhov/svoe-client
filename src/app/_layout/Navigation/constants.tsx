import { BsBasket, BsGift } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { IoFastFoodOutline } from 'react-icons/io5';

export const MENU = [
  {
    title: 'Меню',
    url: '/',
  },
  {
    title: 'Доставка и оплата',
    url: '/dostavka-i-oplata',
  },
  {
    title: 'Отзывы',
    url: '/otzyvi',
  },
  {
    title: 'Контакты',
    url: '/kontakty',
  },
];

export const MOBILE_MENU = [
  {
    title: 'Меню',
    url: '/',
    Icon: IoFastFoodOutline,
  },
  {
    title: 'Корзина',
    url: '/',
    Icon: BsBasket,
  },
  {
    title: 'Акции',
    url: '/',
    Icon: BsGift,
  },
  {
    title: 'Контакты',
    url: '/dostavka-i-oplata',
    Icon: FiMapPin,
  },
];
