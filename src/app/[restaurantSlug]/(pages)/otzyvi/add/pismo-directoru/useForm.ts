import { useForm as useFormHook } from 'react-hook-form';

import { CreateReviewData } from 'modules/review/dto';

export const useForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useFormHook<CreateReviewData>();

  const contentRegistration = register('content', {
    required: 'Пожалуйста, введите текст отзыва',
  });

  const phoneRegistration = register('phone', {
    required: 'Пожалуйста, введите телефон',
  });

  const nameRegistration = register('name', {
    required: 'Пожалуйста, введите имя',
  });

  return {
    contentRegistration,
    phoneRegistration,
    errors,
    nameRegistration,
    handleSubmit,
    watch,
    setError,
    reset,
  };
};
