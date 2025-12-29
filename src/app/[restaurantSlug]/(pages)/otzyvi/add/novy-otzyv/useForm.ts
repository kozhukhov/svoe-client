import { useForm as useFormHook } from 'react-hook-form';

import { CreateReviewData } from 'modules/review/dto';

export const useForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    reset,
  } = useFormHook<CreateReviewData>({
    defaultValues: {
      rating: 4,
    },
  });

  const contentRegistration = register('content', {
    required: 'Пожалуйста, введите текст отзыва',
  });

  const phoneRegistration = register('phone', {
    required: 'Пожалуйста, введите телефон',
  });

  const nameRegistration = register('name', {
    required: 'Пожалуйста, введите имя',
  });

  const ratingRegistration = register('rating', {
    required: 'Пожалуйста, выберите оценку',
  });

  return {
    contentRegistration,
    phoneRegistration,
    errors,
    nameRegistration,
    ratingRegistration,
    handleSubmit,
    watch,
    setError,
    setValue,
    reset,
  };
};
