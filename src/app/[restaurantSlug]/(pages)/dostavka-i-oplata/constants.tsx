import { MdAccessTime, MdLocalShipping, MdPayment } from 'react-icons/md';

import { RestaurantDTO } from 'modules/restaurant/dto';

export const getDeliveryCards = (restaurant: RestaurantDTO) => {
  return [
    {
      icon: <MdAccessTime />,
      name: 'Время доставки',
      value: 'Ежедневно с 11:00 до 23:00',
      note: `Принимаем заказы до 22:00. Среднее время доставки по городу - около ${restaurant?.deliveryTimeMinutes} минут.`,
    },
    {
      icon: <MdLocalShipping />,
      name: 'Условия доставки',
      value: `Бесплатно от ${restaurant?.deliveryMinFreeSum?.toFixed(2)} BYN`,
      note: `При сумме заказа до ${restaurant?.deliveryMinFreeSum?.toFixed(2)} BYN стоимость доставки - ${restaurant?.deliveryPaidCost?.toFixed(2)} BYN.`,
    },
    {
      icon: <MdPayment />,
      name: 'Способы оплаты',
      value: 'Наличными или картой',
      note: 'Вы можете оплатить заказ при получении курьеру наличными или банковской картой. Чек выдаём вместе с заказом.',
    },
  ];
};

export const ITEMS = [
  'Если время увеличивается из-за загруженности - предупреждаем заранее.',
  'Наши курьеры хорошо знают город и привозят заказы аккуратно и вовремя.',
  'Курьеры работают ежедневно с 11:00 до 23:00, принимаем заказы до 22:00.',
  'Бережная упаковка сохраняет температуру и внешний вид блюд.',
];
