import * as actions from './actions';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, concatMap, EMPTY, switchMap, tap } from 'rxjs';
import { RegisterInfo } from './models/register-info';
import { PayloadEpic, SimpleEpic } from '../helpers';
import { map } from 'rxjs/operators';
import { UserService } from '../../app/services/user-service/user-service';
import { PageRoutes } from '../../app/consts/routes';
import { history } from '../../history';

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

export const userEpics = combineEpics(registerEpic$, registerSuccessEpic$);
