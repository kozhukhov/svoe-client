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

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

/** Преобразует название категории в URL-slug (латиница, lowercase, дефисы). */
export function slugifyCategoryName(name: string): string {
  const lower = name.toLowerCase().trim();
  let result = '';
  for (const char of lower) {
    const code = char.charCodeAt(0);
    if (code >= 0x0400 && code <= 0x04ff) {
      result += CYRILLIC_TO_LATIN[char] ?? char;
    } else if (/[a-z0-9]/.test(char)) {
      result += char;
    } else if (char === ' ' || char === '-') {
      result += '-';
    }
  }
  return result.replace(/-+/g, '-').replace(/^-|-$/g, '') || 'category';
}
