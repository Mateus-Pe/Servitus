import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioFeedComponent } from './calendario-feed.component';

describe('CalendarioFeedComponent', () => {
  let component: CalendarioFeedComponent;
  let fixture: ComponentFixture<CalendarioFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
