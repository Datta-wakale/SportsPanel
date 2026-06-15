import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSports } from './manage-sports';

describe('ManageSports', () => {
  let component: ManageSports;
  let fixture: ComponentFixture<ManageSports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSports],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
