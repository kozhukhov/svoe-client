export const formatToShortDate = (date: Date | string): string => {
  try {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch (_) {
    return date as string;
  }
};

export const formatToLongDate = (date: Date | string): string => {
  try {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch (_) {
    return date as string;
  }
};

export const formatToLongDateWithTime = (date: Date | string): string => {
  try {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (_) {
    return date as string;
  }
};
