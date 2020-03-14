import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RppmComponent } from './rppm.component';

describe('RppmComponent', () => {
  let component: RppmComponent;
  let fixture: ComponentFixture<RppmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RppmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RppmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
