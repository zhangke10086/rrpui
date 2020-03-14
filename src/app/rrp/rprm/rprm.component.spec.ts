import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RprmComponent } from './rprm.component';

describe('RprmComponent', () => {
  let component: RprmComponent;
  let fixture: ComponentFixture<RprmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RprmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RprmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
