import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: 'src/app/view/home/home.module#HomeModule',
    pathMatch: 'full',
    canActivate: []
  },
  {
    path: 'test',
    loadChildren: 'src/app/view/test/test.module#TestModule',
    pathMatch: 'full',
    canActivate: []
  }
];

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false,
  enableTracing: false,
  onSameUrlNavigation: 'reload'
});
