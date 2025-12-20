interface StorageService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): T;
  subscribe(listener: (event: StorageEvent) => void): () => void;
}

export class LocalStorageServiceClass implements StorageService {
  get<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);

      if (!item) {
        return null;
      }

      return JSON.parse(item) as T;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }

  set<T>(key: string, value: T): T {
    const newValue = JSON.stringify(value);

    window.localStorage.setItem(key, newValue);
    window.dispatchEvent(new StorageEvent('storage', { key, newValue }));

    return value;
  }

  subscribe(this: void, listener: (event: StorageEvent) => void) {
    window.addEventListener('storage', listener);

    return () => window.removeEventListener('storage', listener);
  }
}

export const LocalStorageService = new LocalStorageServiceClass();
