import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { AsideModalComponent } from './aside-modal.component';
import { NgxAsideModule } from 'ngx-aside';

@NgModule({
  declarations: [AsideModalComponent],
  exports: [AsideModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxAsideModule
  ],
  providers: [
  ]
})
export class AsideModalModule { }
