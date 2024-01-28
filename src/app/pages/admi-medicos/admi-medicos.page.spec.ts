import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmiMedicosPage } from './admi-medicos.page';

describe('AdmiMedicosPage', () => {
  let component: AdmiMedicosPage;
  let fixture: ComponentFixture<AdmiMedicosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmiMedicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
