import * as actions from './actions';
import * as mapActions from '../map/actions';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, concatMap, EMPTY, switchMap, tap } from 'rxjs';
import { RegisterInfo } from './models/register-info';
import { PayloadEpic, SimpleEpic } from '../helpers';
import { map } from 'rxjs/operators';
import { UserService } from '../../app/services/user-service/user-service';
import { PageRoutes } from '../../app/consts/routes';
import { history } from '../../history';
import { LoginInfo } from './models/login-info';
import { LocalStorageService } from '../../app/services/local-storage/local-storage-service';
import { LocalStorageKeys } from '../../app/consts/local-storage-keys';
import { AuthInfo } from './models/auth-info';

const registerEpic$: PayloadEpic<RegisterInfo> = actions$ =>
  actions$.pipe(
    ofType(actions.register.type),
    map(x => x.payload),
    switchMap(info =>
      UserService.register(info).pipe(
        map(() => actions.registerSuccess()),
        catchError(error => [actions.registerFailure(error)])
      )
    )
  );

const registerSuccessEpic$: SimpleEpic = actions$ =>
  actions$.pipe(
    ofType(actions.registerSuccess.type),
    tap(() => history.push(PageRoutes.login)),
    concatMap(() => EMPTY)
  );

const loginEpic$: PayloadEpic<LoginInfo> = actions$ =>
  actions$.pipe(
    ofType(actions.login.type),
    map(x => x.payload),
    switchMap(info =>
      UserService.login(info).pipe(
        map(info => actions.loginSuccess(info)),
        catchError(error => [actions.loginFailure(error)])
      )
    )
  );

const loginSuccessEpic$: PayloadEpic<AuthInfo> = actions$ =>
  actions$.pipe(
    ofType(actions.loginSuccess.type),
    tap(({ payload }) => {
      LocalStorageService.setItem(LocalStorageKeys.Token, payload.token);
      history.push(PageRoutes.lobby);
    }),
    concatMap(() => EMPTY)
  );

const logoutEpic$: SimpleEpic = actions$ =>
  actions$.pipe(
    ofType(actions.logout),
    tap(() => {
      LocalStorageService.removeItem(LocalStorageKeys.Token);
      history.push(PageRoutes.login);
    }),
    map(() => mapActions.clear())
  );

export const userEpics = combineEpics<any>(
  registerEpic$,
  registerSuccessEpic$,
  loginEpic$,
  loginSuccessEpic$,
  logoutEpic$
);
