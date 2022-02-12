import { Observable } from 'rxjs';
import { MapModel } from '../../../store/map/models/map-model';
import { HttpService } from '../http-service/http-service';
import { map } from 'rxjs/operators';
import { PutMapModel } from './models/put-map-model';
import mime from 'mime';

class ModelServiceImpl {
  getModels(): Observable<MapModel[]> {
    return HttpService.get<MapModel[]>('models');
  }

  uploadAttachment(file: File): Observable<number> {
    const formData = new FormData();
    formData.append(
      'Files',
      new Blob([file], { type: mime.getType(file.name) as string }),
      file.name
    );

    return HttpService.postFormData<any>('attachments', formData).pipe(
      map(data => data.files[0].id)
    );
  }

  putModels(model: PutMapModel): Observable<void> {
    return HttpService.put('models', model);
  }
}

export const ModelService = new ModelServiceImpl();
