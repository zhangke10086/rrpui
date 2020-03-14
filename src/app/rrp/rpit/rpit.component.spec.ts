import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpitComponent } from './rpit.component';

describe('RpitComponent', () => {
  let component: RpitComponent;
  let fixture: ComponentFixture<RpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
