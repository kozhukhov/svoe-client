import {
  MdMoreHoriz,
  MdOutlineCardGiftcard,
  MdOutlineFastfood,
  MdOutlineShoppingBasket,
} from 'react-icons/md';

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
    Icon: MdOutlineFastfood,
  },
  {
    title: 'Корзина',
    url: '/korzina',
    Icon: MdOutlineShoppingBasket,
  },
  {
    title: 'Акции',
    url: '/',
    Icon: MdOutlineCardGiftcard,
  },
  {
    title: 'Еще',
    Icon: MdMoreHoriz,
  },
];
