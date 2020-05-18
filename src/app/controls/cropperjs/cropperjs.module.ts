import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { CropperjsComponent } from './cropperjs.component';
import { AngularCropperjsModule } from 'angular-cropperjs';

@NgModule({
  declarations: [CropperjsComponent],
  exports: [CropperjsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularCropperjsModule
  ],
  providers: [
  ]
})
export class CropperJsModule { }
