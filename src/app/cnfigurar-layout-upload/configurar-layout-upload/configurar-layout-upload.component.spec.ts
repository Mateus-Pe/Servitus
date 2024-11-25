import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarLayoutUploadComponent } from './configurar-layout-upload.component';

describe('ConfigurarLayoutUploadComponent', () => {
  let component: ConfigurarLayoutUploadComponent;
  let fixture: ComponentFixture<ConfigurarLayoutUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurarLayoutUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarLayoutUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
