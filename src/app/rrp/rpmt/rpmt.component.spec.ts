import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpmtComponent } from './rpmt.component';

describe('RpmtComponent', () => {
  let component: RpmtComponent;
  let fixture: ComponentFixture<RpmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
