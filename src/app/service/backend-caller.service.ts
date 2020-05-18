import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class BackendService {

  constructor(private httpClient: HttpClient) {
  }

  public get(url): Observable<any> {
    let subject = new Subject<any>();
    this.httpClient.get(url, {headers: {'Cache-Control': 'no-cache'}}).subscribe(
      httpData => {
        subject.next(httpData);
      },
      err => this.handleError);
    return subject;
  }

  public post(url, data, header) {
    let subject = new Subject<any>();
    this.httpClient.post(url, data, header).subscribe(
      httpData => {
        subject.next(httpData);
      },
      err => this.handleError);
    return subject;
  }

  public put(url, data) {
    let subject = new Subject<any>();
    this.httpClient.put(url, data).subscribe(
      httpData => {
        subject.next(httpData);
      },
      err => this.handleError);
    return subject;
  }

  public handleError(error: any) {
    console.error('An error occurred', error);
  }

}
