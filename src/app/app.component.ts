import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {EventManagerService, EventParams} from './service/base/event-manager.service';
import {ToastrService} from 'ngx-toastr';
import {BaseComponent, EVENT_NAME_LOADER_HIDE, EVENT_NAME_LOADER_SHOW, TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING} from './util/base-view';
import * as Aos from 'aos';
import { fadeAnimation } from './util/animations/route-animation';

export class AppViewModel {

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class AppComponent extends BaseComponent<AppViewModel> implements OnInit {
  title = 'angular-skeleton';

  public isShowLoader = false;
  public loaderMessage: string;

  constructor(translate: TranslateService, eventManager: EventManagerService,
              private toastr: ToastrService, private changeDetector: ChangeDetectorRef) {
    super(eventManager);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    Aos.init({});
    this.LoaderEvent();
    this.ToastEvent();
  }

  private LoaderEvent() {
    this.eventManager.subscribe(EVENT_NAME_LOADER_HIDE, (msg: EventParams) => {
      this.isShowLoader = false;
      this.loaderMessage = msg.params;
    });
    this.eventManager.subscribe(EVENT_NAME_LOADER_SHOW, (msg: EventParams) => {
      this.isShowLoader = true;
      this.loaderMessage = msg.params;
    });
  }

  private ToastEvent() {
    let self = this;
    this.eventManager.subscribe(TOAST_SUCCESS, (msg: EventParams) => {
      self.toastr.success(msg.params, 'Success!');
    });
    this.eventManager.subscribe(TOAST_ERROR, (msg: EventParams) => {
      self.toastr.error(msg.params, 'Error!');
    });
    this.eventManager.subscribe(TOAST_WARNING, (msg: EventParams) => {
      self.toastr.warning(msg.params, 'Warning!');
    });
  }

}
