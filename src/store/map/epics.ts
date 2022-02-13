import { combineEpics, ofType } from 'redux-observable';
import * as actions from './actions';
import {
  catchError,
  concatMap,
  debounceTime,
  EMPTY,
  switchMap,
  tap
} from 'rxjs';
import { ModelService } from '../../app/services/model-service/model-service';
import { map } from 'rxjs/operators';
import { PayloadEpic, SimpleEpic, StatePayloadEpic } from '../helpers';
import { RootState } from '../store';
import { notification } from 'antd';

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
            map(() => actions.uploadModelSuccess({ newModelId: id })),
            catchError(error => [actions.uploadModelFailure(error)])
          )
        ),
        catchError(error => [actions.uploadModelFailure(error)])
      );
    })
  );

const uploadModelSuccessEpic$: PayloadEpic<{ newModelId: number }> = actions$ =>
  actions$.pipe(
    ofType(actions.uploadModelSuccess.type),
    switchMap(({ payload }) =>
      ModelService.getModel(payload.newModelId).pipe(
        map(newModel => actions.addModel(newModel)),
        catchError(error => [actions.uploadModelFailure(error)])
      )
    )
  );

const deleteModelEpic$: PayloadEpic<{ id: string }> = actions$ =>
  actions$.pipe(
    ofType(actions.deleteModel.type),
    switchMap(({ payload }) =>
      ModelService.deleteModel(parseInt(payload.id)).pipe(
        map(deleted => {
          const deletedId = deleted.ids[0];
          if (deletedId) {
            return actions.removeModel({ id: deletedId });
          }
          return EMPTY;
        }),
        catchError(error => [actions.deleteModelFailure(error)])
      )
    )
  );

const removeModelNotificationEpic$: SimpleEpic = actions$ =>
  actions$.pipe(
    ofType(actions.removeModel.type),
    tap(() => {
      notification.success({
        message: 'Success',
        description: 'Model deleted'
      });
    }),
    concatMap(() => EMPTY)
  );

const uploadModelSuccessNotificationEpic$: SimpleEpic = actions$ =>
  actions$.pipe(
    ofType(actions.uploadModelSuccess.type),
    tap(() => {
      notification.success({
        message: 'Success',
        description: 'The model has been loaded'
      });
    }),
    concatMap(() => EMPTY)
  );

export const mapEpics = combineEpics(
  loadModelsEpic$,
  setZoomEpic$,
  // @ts-ignore
  uploadModelEpic$,
  uploadModelSuccessEpic$,
  deleteModelEpic$,
  removeModelNotificationEpic$,
  uploadModelSuccessNotificationEpic$
);
