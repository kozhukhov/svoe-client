type BaseOrderDTO = {
  restaurantId: string;
  name: string;
  phone: string;
  comment?: string;
  deliveryCost: number;
  finalPrice: number;
  items: Array<{
    fullName: string;
    productId: string;
    price: number;
    amount: number;
    productSizeId?: string;
    modifiers?: Array<{
      amount: number;
      productGroupId: string;
      productId: string;
    }>;
  }>;
};

type DeliveryByCourierrDTO = {
  orderServiceType: 'DeliveryByCourier';
  street: string;
  houseNumber: string;
  entrance?: string;
  floor?: string;
  flatNumber?: string;
};

type DeliveryByClientDTO = {
  orderServiceType: 'DeliveryByClient';
};

type PaymentCashDTO = {
  paymentType: 'Cash';
  changeFrom?: number;
};

type PaymentCardDTO = {
  paymentType: 'Card';
};

export type CreateOrderDTO = BaseOrderDTO &
  (DeliveryByCourierrDTO | DeliveryByClientDTO) &
  (PaymentCashDTO | PaymentCardDTO);

export type OrderDTO = {
  orderInfo: {
    id: string;
    creationStatus: 'InProgress' | 'Success' | 'Error';
  };
};
