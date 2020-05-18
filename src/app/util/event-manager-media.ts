import {Injectable, NgZone} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable()
export class EventManagerMedia {
  observable: Subject<EventParams>;

  constructor(private _NgZone: NgZone) {
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
    subscriber.unsubscribe();
  }
}

export class EventParams {
  name: string = null;
  params: any = null;
  targetModel: any = null;
}
