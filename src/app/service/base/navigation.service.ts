import {ErrorHandler, Injectable} from '@angular/core';
import {IModelData} from '../../interface/model.Interface';
import {EventManagerService} from './event-manager.service';
import {BaseComponent} from '../../util/base-view';

@Injectable()
export class BackendService extends BaseComponent<any> implements ErrorHandler {

  private _model: IModelData;
  private _filter: any;
  private _currentUser: any;

  constructor(eventManager: EventManagerService) {
    super(eventManager);
  }

  get filter(): any {
    return this._filter;
  }

  set filter(value: any) {
    this._filter = value;
  }

  get currentUser(): any {
    return this._currentUser;
  }

  set currentUser(value: any) {
    this._currentUser = value;
  }

  get model(): IModelData {
    return this._model;
  }

  set model(value: IModelData) {
    this._model = value;
  }

  handleError(error) {
    throw error;
  }
}
