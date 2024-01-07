import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiAgendaPage } from './mi-agenda.page';

describe('MiAgendaPage', () => {
  let component: MiAgendaPage;
  let fixture: ComponentFixture<MiAgendaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MiAgendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
