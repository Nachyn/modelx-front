import { HttpService } from '../http-service/http-service';
import { RegisterInfo } from '../../../store/user/models/register-info';
import { UserState } from '../../../store/user/slice';
import { Observable } from 'rxjs';

class UserServiceImpl {
  register(info: RegisterInfo): Observable<UserState> {
    return HttpService.post<UserState>('accounts', info);
  }
}

export const UserService = new UserServiceImpl();
