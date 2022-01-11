import axios from 'axios';
import { LocalStorageService } from '../local-storage/local-storage-service';
import { LocalStorageKeys } from '../../consts/local-storage-keys';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { notification } from 'antd';
import { history } from '../../../history';
import { PageRoutes } from '../../consts/routes';

const instance = axios.create({
  baseURL: 'https://localhost:5500/api'
});

instance.interceptors.request.use(config => {
  const token = LocalStorageService.getItem(LocalStorageKeys.Token);
  config.headers!['Authorization'] = 'Bearer ' + token;
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response.status;
    const data = error.response.data;

    if ([400, 404].includes(status)) {
      const description = Array.isArray(data) ? data.join(' ') : data;

      notification.info({
        message: 'Error',
        description
      });
    } else if ([401, 403].includes(status)) {
      history.push(PageRoutes.login);
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
