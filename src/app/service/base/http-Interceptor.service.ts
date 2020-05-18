import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {EventManagerService} from './event-manager.service';
import {BaseComponent} from '../../util/base-view';

@Injectable()
export class HttpInterceptorService extends BaseComponent<any> implements HttpInterceptor {

  constructor(eventManager: EventManagerService) {
    super(eventManager);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // TODO: logging
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              alert('rieffettuare login');
              break;
            case 500:
              alert('server error');
              break;
          }
        }
      }));
  }
}
