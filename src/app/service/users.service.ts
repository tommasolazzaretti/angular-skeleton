import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {delay, map, withLatestFrom} from 'rxjs/operators';
import {AsyncUserList, IUser} from '../model/IUser';
import {AsyncItemState, IAsyncItem, makeAsyncItem} from '../model/i-async-item';
import {AVATARS} from '../controls/svg-icon/svg-icon.component';

const URL_MOCK_USERS = 'assets/mock/users.json';
const RESPONSE_DELAY = 1750;

@Injectable()
export class UsersService {
  elementToGhost: number = 10;
  private request: Subscription;
  private announcer = new BehaviorSubject<AsyncUserList>(buildGhosts(this.elementToGhost));

  users$ = this.announcer.asObservable();

  public listElemts: IAsyncItem<IUser>[] = [];

  constructor(private http: HttpClient) {
  }

  /**
   *
   */
  loadUsers(): Observable<IAsyncItem<IUser>[]> {
    this.announcer.next(buildGhosts(this.elementToGhost));
    this.queryServer();

    return this.users$;
  }

  addUser(): Observable<IAsyncItem<IUser>[]> {
    this.announcer.next(buildGhosts(this.elementToGhost, this.listElemts));
    this.queryServer(true);

    return this.users$;
  }

  refreshUser(item: IAsyncItem<IUser>) {
    if (!item.data) {
      return;
    }

    const user = {...item.data};
    const findUserInList = (list: IUser[]) => {
      return list.reduce((foundVar, it) => {
        return foundVar || ((it.email === user.email) ? it : null);
      }, null);
    };
    const updateUserInList = (updated, items) => {
      return items.map(it => {
        if (it.data && (it.data.email === user.email)) {
          it = makeAsyncItem(updated, AsyncItemState.LOADED);
        }
        return it;
      });
    };

    this.http.get(URL_MOCK_USERS).pipe(
      delay(RESPONSE_DELAY),
      map(injectAvatars),          // add cartoon avatars
      map(findUserInList),
      withLatestFrom(this.users$)
    ).subscribe(([updated, items]) => {
      this.announcer.next(updateUserInList(updated, items));
    });

    // Set item state to 'polling'
    item.state = AsyncItemState.POLLING;
  }

  // ***************************************************************
  // Private Methods
  // ***************************************************************

  private queryServer(push: boolean = false) {
    const response$ = this.http.get(URL_MOCK_USERS);
    this.request = response$.pipe(
      delay(RESPONSE_DELAY),        // Simulating network latency
      map(injectAvatars),          // add cartoon avatars
      map(wrapAsAsyncItems),        // add AsyncItem wrappers
      map(simulatePartialLoads)     // simulate partial response
    )
      .subscribe(list => {
        if (!push) {
          this.listElemts = list;
        } else {
          this.listElemts.push(...list);
        }
        this.announcer.next(this.listElemts);
      });
  }
}

// ********************************************************
// ****************   Utils
// ********************************************************

/**
 * Build initial list of Ghost elements
 */
function buildGhosts(numberVar, list?): AsyncUserList {
  let ghosts = new Array(numberVar).fill(null);
  return wrapAsAsyncItems(ghosts, list ? list : null);
}

/**
 * Inject avatar names for each user
 */
function injectAvatars(users) {
  const addAvatar = (it, i) => {
    it.avatar = AVATARS[i % AVATARS.length];
  };
  users.forEach(addAvatar);
  return users;
}

/**
 * Wrap `user` values for async presentation with ghosts
 */
function wrapAsAsyncItems(list, modelList?) {
  if (!modelList) {
    return list.map((user: IUser) => makeAsyncItem<IUser>(user, AsyncItemState.LOADING));
  } else {
    list = list.map((user: IUser) => makeAsyncItem<IUser>(user, AsyncItemState.LOADING));
    return [...modelList, ...list];
  }

}

/**
 * Simulate only a partial load of users
 */
function simulatePartialLoads(list) {
  console.log(list);
  return list.map((it, i) => {
    const hasData = !!it.data;
    const state = (hasData && ((i + 1) % 3)) ? AsyncItemState.LOADED : AsyncItemState.LOADING;

    return makeAsyncItem(state === AsyncItemState.LOADING ? null : it.data, state);
  });
}
