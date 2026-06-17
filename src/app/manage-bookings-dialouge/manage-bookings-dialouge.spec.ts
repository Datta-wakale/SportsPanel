import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingsDialouge } from './manage-bookings-dialouge';

describe('ManageBookingsDialouge', () => {
  let component: ManageBookingsDialouge;
  let fixture: ComponentFixture<ManageBookingsDialouge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBookingsDialouge],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageBookingsDialouge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
