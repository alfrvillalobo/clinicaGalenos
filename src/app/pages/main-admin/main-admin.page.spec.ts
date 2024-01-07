import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainAdminPage } from './main-admin.page';

describe('MainAdminPage', () => {
  let component: MainAdminPage;
  let fixture: ComponentFixture<MainAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
