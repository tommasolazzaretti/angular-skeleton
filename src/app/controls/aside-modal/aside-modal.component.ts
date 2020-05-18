import { Component, OnInit, ViewEncapsulation, ViewChild, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { AsideSettingsModel } from 'src/app/model/asideSettingsModel';
import { ɵa } from 'ngx-aside';

@Component({
  selector: 'app-aside-modal',
  templateUrl: './aside-modal.component.html',
  styleUrls: ['./aside-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AsideModalComponent implements OnInit {
  @ViewChild('NgxAsidePanel') NgxAsidePanel: ɵa;

  @Input() settings: AsideSettingsModel = {} as AsideSettingsModel;

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('init');
  }

}
