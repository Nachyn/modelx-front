import { Observable } from 'rxjs';
import { MapModel } from '../../../store/map/models/map-model';
import { HttpService } from '../http-service/http-service';

class ModelServiceImpl {
  getModels(): Observable<MapModel[]> {
    return HttpService.get<MapModel[]>('models');
  }
}

export const ModelService = new ModelServiceImpl();
