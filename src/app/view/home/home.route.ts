import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {ModuleWithProviders} from '@angular/core';

export const route: Routes = [
  { path: '', component: HomeComponent }
];

export const HOME_ROUTES: ModuleWithProviders = RouterModule.forChild(route);
