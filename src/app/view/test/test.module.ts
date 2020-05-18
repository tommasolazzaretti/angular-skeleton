import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { TEST_ROUTES } from './test.route';
import { AngularGridsterModule } from 'src/app/controls/gridster/gridster.module';
import { SpinnerImgModule } from 'src/app/controls/spinner-img/spinner-img.module';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { BackendService } from 'src/app/service/backend-caller.service';
import { UserListModule } from 'src/app/controls/user-list/user-list.module';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    AngularGridsterModule,
    SpinnerImgModule,
    UserListModule,
    LazyLoadImagesModule,
    TEST_ROUTES
  ], providers : [
    BackendService
  ]
})
export class TestModule { }
