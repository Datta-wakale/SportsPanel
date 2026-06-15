import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVenues } from './manage-venues';

describe('ManageVenues', () => {
  let component: ManageVenues;
  let fixture: ComponentFixture<ManageVenues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVenues],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageVenues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
