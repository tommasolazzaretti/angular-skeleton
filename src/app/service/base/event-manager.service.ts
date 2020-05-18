import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable()
export class EventManagerService {

  observable: Subject<EventParams>;

  constructor() {
    if (!this.observable) {
      this.observable = new Subject();
    }
  }

  broadcast(event: EventParams) {
    this.observable.next(event);
  }

  call(name) {
    return this.observable
      .pipe(filter((event) => {
        return event.name === name;
      }));
  }

  subscribe(name, callback) {
    return this.observable.pipe(filter((event) => {
      return event.name === name;
    })).subscribe(callback);
  }

  destroy(subscriber: Subscription) {
    this.observable.unsubscribe();
  }
}

export class EventParams {
  name: string = null;
  params: any = null;
  targetModel: any = null;
}
