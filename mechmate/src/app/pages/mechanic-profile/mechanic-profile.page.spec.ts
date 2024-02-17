import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MechanicProfilePage } from './mechanic-profile.page';

describe('MechanicProfilePage', () => {
  let component: MechanicProfilePage;
  let fixture: ComponentFixture<MechanicProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MechanicProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
