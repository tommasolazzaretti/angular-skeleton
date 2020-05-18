import {NgModule} from '@angular/core';
import {SpinnerImgComponent} from './spinner-img.component';
import {CommonModule} from '@angular/common';
import {LazyLoadImagesModule} from 'ngx-lazy-load-images';

@NgModule({
  declarations: [SpinnerImgComponent],
  imports: [CommonModule,
    LazyLoadImagesModule
  ], exports: [SpinnerImgComponent]
})
export class SpinnerImgModule {
}
