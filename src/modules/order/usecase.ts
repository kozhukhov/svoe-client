import { snackbar } from 'app/_layout/Snackbars';

import { CreateOrderDTO, OrderDTO } from './dto';
import { createOrder } from './service';

export const createOrderUseCase = ({
  onSuccess,
  onError,
  ...orderData
}: CreateOrderDTO & {
  onSuccess: (info: OrderDTO) => void;
  onError: () => void;
}) =>
  snackbar
    .promise(
      createOrder.request(createOrder.getUrl(), {
        arg: orderData,
      }),
      {
        loading: 'Создание заказа',
        success: 'Заказ успешно создан',
        error: 'Не удалось создать заказ',
      },
    )
    .then((info) => {
      onSuccess(info);
    })
    .catch((error) => {
      onError();
      console.error(error);
    });
