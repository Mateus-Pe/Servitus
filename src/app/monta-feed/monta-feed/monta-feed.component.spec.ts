import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontaFeedComponent } from './monta-feed.component';

describe('MontaFeedComponent', () => {
  let component: MontaFeedComponent;
  let fixture: ComponentFixture<MontaFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontaFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontaFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
