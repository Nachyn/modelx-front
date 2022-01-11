import { LocalStorageKeys } from '../../consts/local-storage-keys';

class LocalStorageServiceImpl {
  setItem(key: LocalStorageKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: LocalStorageKeys): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }

  getItemThenRemoveIt(key: LocalStorageKeys): string | null {
    const item = this.getItem(key);
    this.removeItem(key);

    return item;
  }

  clear() {
    localStorage.clear();
  }
}

export const LocalStorageService = new LocalStorageServiceImpl();
