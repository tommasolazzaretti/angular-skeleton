import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {EventManagerService} from '../../service/base/event-manager.service';
import {BaseComponent} from '../../util/base-view';
import {AsideSettingsModel} from 'src/app/model/asideSettingsModel';

export class HomeViewModel {

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends BaseComponent<HomeViewModel> implements OnInit {
  @ViewChild('asideModal') asideModal: any;

  settings: AsideSettingsModel = {} as AsideSettingsModel;

  constructor(eventManager: EventManagerService) {
    super(eventManager);
  }

  ngOnInit() {
    if (!this.ViewModel) {
      this.ViewModel = new HomeViewModel();
    }

    this.settings = {
      title: 'test',
      closeOnEscape: true,
      position: 'right',
      showOverlay: true,
      showDefaultFooter: false,
      showDefaultHeader: false
    };
  }

  showModal() {
    this.asideModal.NgxAsidePanel.show();
  }

  closeModal() {
    this.asideModal.NgxAsidePanel.hide();
  }

}
