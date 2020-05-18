import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingModule} from './controls/loader/loading.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import {ToastrModule} from 'ngx-toastr';
import {HttpLoaderFactory, MyHammerConfig} from './app.module';
import {EventManagerService} from './service/base/event-manager.service';
import {CookieService} from 'ngx-cookie-service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        BrowserModule,
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
        RouterTestingModule
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
    }).compileComponents();
  }));

  it('should create the app', () => {
    const app = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-skeleton'`, () => {
    const app = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    expect(app.title).toEqual('angular-skeleton');
  });

  it('should render title in a h1 tag', () => {
    // tslint:disable-next-line:no-shadowed-variable
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-skeleton!');
  });
});
