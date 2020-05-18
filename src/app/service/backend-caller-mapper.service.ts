import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Mapper} from '../util/mapper';

@Injectable()
export class BackendService implements ErrorHandler {

  constructor(private http: HttpClient) {
  }

  public get(_path, _options, mapping: object): Observable<any> {
    return this.http.get(_path, _options ? _options : {}).pipe(map(response => {
      if (response) {
        return Mapper.map<any>(response, mapping);
      }
      return response;
    }));
  }

  public post(_path, data, header, mapping: object): Observable<any> {
    return this.http.post(_path, data, header).pipe(this.mapResponse(mapping));
  }

  public postSendMail(_path, data): Observable<any> {
    return this.http.post(_path, data).pipe(map(response => {
      return response;
    }));
  }

  public patch(_path, data, header, mapping: object): Observable<any> {
    return this.http.patch(_path, data, header).pipe(this.mapResponse(mapping));
  }

  public delete(_path: string, _options = null): Observable<any> {
    if (_path.indexOf('=eq.') !== -1) {
      return this.http.delete(_path, _options ? _options : {});
    }
  }

  private mapResponse(mapping: object) {
    return map(response => {
      if (response['result'] && response['result'].length > 0) {
        return Mapper.map<any>(response['result'], mapping);
      }
      return response;
    });
  }

  public handleError(error: any) {
    console.error('An error occurred', error);
  }

}
