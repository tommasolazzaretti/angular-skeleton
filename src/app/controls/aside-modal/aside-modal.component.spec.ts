import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideModalComponent } from './aside-modal.component';

describe('AsideModalComponent', () => {
  let component: AsideModalComponent;
  let fixture: ComponentFixture<AsideModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
