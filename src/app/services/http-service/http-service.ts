import axios from 'axios';
import { LocalStorageService } from '../local-storage/local-storage-service';
import { LocalStorageKeys } from '../../consts/local-storage-keys';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { notification } from 'antd';

const instance = axios.create({
  baseURL: 'https://localhost:5500/api'
});

instance.interceptors.request.use(config => {
  config.headers!['Authorization'] =
    'Bearer ' + LocalStorageService.getItem(LocalStorageKeys.Token);
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if ([400, 404].includes(error.response.status)) {
      const description = Array.isArray(error.response.data)
        ? error.response.data.join(' ')
        : error.response.data;

      notification.info({
        message: 'Error',
        description
      });
    } else {
      notification.error({
        message: 'Error',
        description: 'Server is not available..'
      });
    }
    return Promise.reject(error);
  }
);

class HttpServiceImpl {
  post<T>(url: string, data: any): Observable<T> {
    return from(instance.post<T>(url, data)).pipe(map(x => x.data));
  }
}

export const HttpService = new HttpServiceImpl();
