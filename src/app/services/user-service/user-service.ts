import { HttpService } from '../http-service/http-service';
import { RegisterInfo } from '../../../store/user/models/register-info';
import { UserState } from '../../../store/user/slice';
import { Observable } from 'rxjs';
import { LoginInfo } from '../../../store/user/models/login-info';
import { AuthInfo } from '../../../store/user/models/auth-info';

class UserServiceImpl {
  register(info: RegisterInfo): Observable<UserState> {
    return HttpService.post<UserState>('accounts', info);
  }

  login(info: LoginInfo): Observable<AuthInfo> {
    return HttpService.post<AuthInfo>('accounts/auth', {
      ...info,
      type: 'password',
      refreshToken: 'empty'
    });
  }
}

export const UserService = new UserServiceImpl();
