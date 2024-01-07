import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerPasswordPage } from './restablecer-password.page';

describe('RestablecerPasswordPage', () => {
  let component: RestablecerPasswordPage;
  let fixture: ComponentFixture<RestablecerPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RestablecerPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
