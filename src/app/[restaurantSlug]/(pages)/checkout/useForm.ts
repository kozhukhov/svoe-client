import { useMemo } from 'react';
import { useForm as useFormHook } from 'react-hook-form';

export type CheckoutFormData = {
  name: string;
  phone: string;
  fulfillment: 'pickup' | 'delivery';
  street: string;
  house: string;
  flat: string;
  entrance: string;
  floor: string;
  payment: 'card' | 'cash';
  changeFrom: string;
  comment: string;
};

export const useForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useFormHook<CheckoutFormData>({
    defaultValues: {
      fulfillment: 'pickup',
      payment: 'card',
      street: '',
      house: '',
      flat: '',
      entrance: '',
      floor: '',
      changeFrom: '',
      comment: '',
      name: '',
      phone: '',
    },
  });

  const fulfillment = watch('fulfillment');
  const payment = watch('payment');

  const fulfillmentRegistration = register('fulfillment');
  const paymentRegistration = register('payment');

  const nameRegistration = register('name', {
    required: 'Пожалуйста, введите имя',
  });

  const phoneRegistration = register('phone', {
    required: 'Пожалуйста, введите телефон',
  });

  const streetRegistration = register('street', {
    validate: (value) =>
      fulfillment === 'delivery' ? !!value || 'Укажите улицу' : true,
  });

  const houseRegistration = register('house', {
    validate: (value) =>
      fulfillment === 'delivery' ? !!value || 'Укажите дом' : true,
  });

  const flatRegistration = register('flat');
  const entranceRegistration = register('entrance');
  const floorRegistration = register('floor');

  const changeFromRegistration = register('changeFrom', {
    validate: (value) => {
      if (payment !== 'cash') return true;
      if (!value) return true;
      const normalized = value.replace(',', '.').trim();
      return /^\d+(\.\d{1,2})?$/.test(normalized) || 'Введите сумму числом';
    },
  });

  const commentRegistration = register('comment');

  const paymentOptions = useMemo(
    () => [
      { label: 'Картой', value: 'card' },
      { label: 'Наличными', value: 'cash' },
    ],
    [],
  );

  const fulfillmentOptions = useMemo(
    () => [
      { label: 'Самовывоз', value: 'pickup' },
      { label: 'Доставка', value: 'delivery' },
    ],
    [],
  );

  return {
    errors,
    handleSubmit,
    setValue,
    reset,
    watch,
    fulfillment,
    payment,
    paymentOptions,
    fulfillmentOptions,
    fulfillmentRegistration,
    paymentRegistration,
    nameRegistration,
    phoneRegistration,
    streetRegistration,
    houseRegistration,
    flatRegistration,
    entranceRegistration,
    floorRegistration,
    changeFromRegistration,
    commentRegistration,
  };
};
