import Cookies from 'js-cookie';
import { WebStorage } from 'redux-persist';

class Storage implements WebStorage {
  getItem = (key: string): Promise<string | null> => {
    return Promise.resolve(Cookies.get(key) || null);
  };

  setItem = (key: string, item: string): Promise<void> => {
    return new Promise(function (resolve) {
      Cookies.set(key, item);
      resolve();
    });
  };

  removeItem = (key: string): Promise<void> => {
    return Promise.resolve(Cookies.remove(key));
  };
}

export const storage = new Storage();
