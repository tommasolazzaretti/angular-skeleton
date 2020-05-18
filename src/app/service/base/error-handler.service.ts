import {ErrorHandler, Injectable} from '@angular/core';
import {BaseComponent} from '../../util/base-view';
import {EventManagerService} from './event-manager.service';

@Injectable()
export class ErrorHandlerService extends BaseComponent<any> implements ErrorHandler {
  constructor(eventManager: EventManagerService) {
    super(eventManager);
  }

  handleError(error) {
    throw error;
  }
}
