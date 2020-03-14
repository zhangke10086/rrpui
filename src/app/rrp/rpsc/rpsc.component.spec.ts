import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpscComponent } from './rpsc.component';

describe('RpscComponent', () => {
  let component: RpscComponent;
  let fixture: ComponentFixture<RpscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
