import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioUtilsComponent } from './calendario-utils.component';

describe('CalendarioUtilsComponent', () => {
  let component: CalendarioUtilsComponent;
  let fixture: ComponentFixture<CalendarioUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioUtilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
