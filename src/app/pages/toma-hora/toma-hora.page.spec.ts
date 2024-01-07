import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TomaHoraPage } from './toma-hora.page';

describe('TomaHoraPage', () => {
  let component: TomaHoraPage;
  let fixture: ComponentFixture<TomaHoraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TomaHoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
