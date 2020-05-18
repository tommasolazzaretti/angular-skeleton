import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {trigger} from '@angular/animations';

import {Observable, of} from 'rxjs';
import {delay, map, tap, startWith} from 'rxjs/operators';
import {fadeOut, fadeIn} from 'src/app/util/animations/fade-animations';
import {queryState, IAsyncItem} from 'src/app/model/i-async-item';
import {UsersService} from 'src/app/service/users.service';
import {IUser} from 'src/app/model/IUser';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ],
  styleUrls: [
    './user-list.component.scss',
    './ghost/ghost-item.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  state = queryState;                   // access to determine async state
  users$ = this.service.loadUsers();    // users enclosed in AsyncItem wrappers

  constructor(public service: UsersService) {
  }

  /**
   * Use 'uid' if not a ghost... otherwise just create a number...
   */
  trackByFn(index: number, user: IAsyncItem<IUser>) {
    return user.data ? user.data.id : 0;
  }

}
