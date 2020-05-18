import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mapper} from '../../util/mapper';
import {map} from 'rxjs/operators';

@Injectable()
export class BackendService implements ErrorHandler {

  constructor(private http: HttpClient) {
  }

  private getMap(_mapping: object) {
    return map(response => {
      if (response['success']) {
        return Mapper.map<any>(response['result'], _mapping);
      }
      return response;
    });
  }

  public get(_path, _options, _mapping: object): Observable<any> {
    return this.http.get(_path, _options ? _options : {}).pipe(this.getMap(_mapping));
  }

  public post(_path, _options, header, _mapping: object) {
    this.http.post(_path, _options ? _options : {}, header).pipe(this.getMap(_mapping));
  }

  public put(_path, _options, _mapping: object) {
    this.http.put(_path, _options ? _options : {}).pipe(this.getMap(_mapping));
  }

  public handleError(error: any) {
    console.error('An error occurred', error);
  }

}
