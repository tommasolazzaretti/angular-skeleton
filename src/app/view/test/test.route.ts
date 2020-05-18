import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { TestComponent } from './test.component';

export const route: Routes = [
  { path: '', component: TestComponent }
];

export const TEST_ROUTES: ModuleWithProviders = RouterModule.forChild(route);
