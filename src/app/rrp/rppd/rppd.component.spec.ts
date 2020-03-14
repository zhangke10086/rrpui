import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RppdComponent } from './rppd.component';

describe('RppdComponent', () => {
  let component: RppdComponent;
  let fixture: ComponentFixture<RppdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RppdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RppdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
