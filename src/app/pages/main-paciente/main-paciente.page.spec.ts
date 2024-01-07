import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPacientePage } from './main-paciente.page';

describe('MainPacientePage', () => {
  let component: MainPacientePage;
  let fixture: ComponentFixture<MainPacientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
