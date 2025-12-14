import { MdLocationOn, MdPhone, MdSchedule } from 'react-icons/md';

import { RestaurantDTO } from 'modules/restaurant/dto';

export const getContactCards = (restaurant: RestaurantDTO) => {
  return [
    {
      icon: <MdPhone />,
      name: 'Телефон для заказов',
      value: restaurant?.phone,
      note: 'Быстро ответим, поможем выбрать роллы и оформим доставку',
    },
    {
      icon: <MdLocationOn />,
      name: 'Адрес самовывоза',
      value: restaurant?.address,
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
