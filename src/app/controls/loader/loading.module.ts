import {NgModule, ModuleWithProviders} from '@angular/core';
import {LoaderComponent} from './loader.component';
import {CommonModule} from '@angular/common';
import {LottieAnimationViewModule} from 'ng-lottie';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    LottieAnimationViewModule.forRoot()
  ],
  exports: [LoaderComponent],
  entryComponents: [LoaderComponent]
})

export class LoadingModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: LoadingModule};
  }
}
