import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MechanicListPage } from './mechanic-list.page';

describe('MechanicListPage', () => {
  let component: MechanicListPage;
  let fixture: ComponentFixture<MechanicListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MechanicListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
