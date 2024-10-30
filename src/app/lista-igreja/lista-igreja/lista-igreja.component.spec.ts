import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIgrejaComponent } from './lista-igreja.component';

describe('ListaIgrejaComponent', () => {
  let component: ListaIgrejaComponent;
  let fixture: ComponentFixture<ListaIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaIgrejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
