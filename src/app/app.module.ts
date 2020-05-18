import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.route';
import {LoadingModule} from './controls/loader/loading.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import Amplify from 'aws-amplify';
import {EventManagerService} from './service/base/event-manager.service';
import {CookieService} from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';

declare var Hammer: any;

export const moment = _rollupMoment || _moment;

Amplify.configure({
  Auth: environment.AMPLIFY_AUTH
});

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: {direction: Hammer.DIRECTION_All},
    swipe: {direction: Hammer.DIRECTION_VERTICAL},
  };

  buildHammer(element: HTMLElement) {
    return new Hammer(element, {
      touchAction: 'auto',
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }]
      ]
    });
  }
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    LoadingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AmplifyAngularModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true,
        newestOnTop: true,
        enableHtml: true,
        timeOut: 5000,
        tapToDismiss: true,
        maxOpened: 2,
        positionClass: 'toast-bottom-right'
      }
    ),
    APP_ROUTES
  ],
  providers: [
    EventManagerService,
    AmplifyService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    CookieService
  ]
})
export class AppModule {
}
