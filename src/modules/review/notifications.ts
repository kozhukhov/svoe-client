export const getCreateReviewMessages = (): Record<
  'loading' | 'error' | 'success',
  string
> => ({
  loading: `Отправка отзыва`,
  error: `Не удалось отправить отзыв`,
  success: `Отзыв успешно отправлен`,
});
