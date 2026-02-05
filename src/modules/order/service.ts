import { apiService, ServiceWithBody } from 'lib/services/APIService';

import { CreateOrderDTO, OrderDTO } from './dto';

export const createOrder: ServiceWithBody<void, CreateOrderDTO, OrderDTO> = {
  getUrl: () => 'order',
  request: async (url, { arg }) => {
    const response = await apiService.post<OrderDTO>(url, arg);

    return response;
  },
};
