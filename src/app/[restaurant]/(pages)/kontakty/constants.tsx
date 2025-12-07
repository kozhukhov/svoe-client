import { MdLocationOn, MdPhone, MdSchedule } from 'react-icons/md';

export const getContactCards = () => {
  return [
    {
      icon: <MdPhone />,
      name: 'Телефон для заказов',
      value: '+375 29 188-05-55',
      note: 'Быстро ответим, поможем выбрать роллы и оформим доставку',
    },
    {
      icon: <MdLocationOn />,
      name: 'Адрес самовывоза',
      value: 'г. Лида, ул. Машерова 12',
      note: 'Заходите без очередей, рядом есть парковка',
    },
    {
      icon: <MdSchedule />,
      name: 'График работы',
      value: 'Ежедневно 11:00 - 23:00',
      note: 'После 22:00 заказы не принимаются',
    },
  ];
};
