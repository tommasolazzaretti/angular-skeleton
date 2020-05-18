import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HOME_ROUTES} from './home.route';
import { AsideModalModule } from 'src/app/controls/aside-modal/aside-modal.module';
import { CropperJsModule } from 'src/app/controls/cropperjs/cropperjs.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AsideModalModule,
    CropperJsModule,
    HOME_ROUTES
  ]
})
export class HomeModule { }
