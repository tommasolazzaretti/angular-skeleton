import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './user-list.component';
import {UsersService} from 'src/app/service/users.service';
import {SvgIconModule} from '../svg-icon/svg-icon.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    SvgIconModule
  ], exports: [UserListComponent], providers: [UsersService]
})
export class UserListModule {
}
