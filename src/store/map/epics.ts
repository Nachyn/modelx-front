import { combineEpics, ofType } from 'redux-observable';
import * as actions from './actions';
import { catchError, concatMap, debounceTime, switchMap } from 'rxjs';
import { ModelService } from '../../app/services/model-service/model-service';
import { map } from 'rxjs/operators';
import { PayloadEpic, SimpleEpic, StatePayloadEpic } from '../helpers';
import { RootState } from '../store';

const loadModelsEpic$: SimpleEpic = actions$ =>
  actions$.pipe(
    ofType(actions.loadModels),
    switchMap(() =>
      ModelService.getModels().pipe(
        concatMap(models => models.map(m => actions.addModel(m))),
        catchError(error => [actions.loadModelsFailure(error)])
      )
    )
  );

const initializeMapEpic$: SimpleEpic = actions$ =>
  actions$.pipe(
    ofType(actions.initializeMapSuccess),
    map(() => actions.loadModels())
  );

const setZoomEpic$: PayloadEpic<number> = actions$ =>
  actions$.pipe(
    ofType(actions.setZoom.type),
    debounceTime(50),
    map(({ payload }) => actions.setZoomSuccess(payload))
  );

const uploadModelEpic$: StatePayloadEpic<File, RootState> = (
  actions$,
  state$
) =>
  actions$.pipe(
    ofType(actions.uploadModel.type),
    switchMap(({ payload }) => {
      return ModelService.uploadAttachment(payload).pipe(
        switchMap(id =>
          ModelService.putModels({
            models: [
              {
                attachmentId: id,
                latitude: state$.value.map.latitude,
                longitude: state$.value.map.longitude
              }
            ]
          }).pipe(
            map(() => actions.uploadModelSuccess()),
            catchError(error => [actions.uploadModelFailure(error)])
          )
        ),
        catchError(error => [actions.uploadModelFailure(error)])
      );
    })
  );

export const mapEpics = combineEpics(
  loadModelsEpic$,
  initializeMapEpic$,
  setZoomEpic$,
  // @ts-ignore
  uploadModelEpic$
);
