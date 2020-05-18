import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import { GridsterComponent } from './gridster.component';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  declarations: [GridsterComponent],
  exports: [GridsterComponent],
  imports: [
    CommonModule,
    GridsterModule,
    SharedModule
  ],
  providers: [
  ]
})
export class AngularGridsterModule { }
