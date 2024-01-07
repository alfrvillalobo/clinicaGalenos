import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMedicosPage } from './main-medicos.page';

describe('MainMedicosPage', () => {
  let component: MainMedicosPage;
  let fixture: ComponentFixture<MainMedicosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainMedicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
