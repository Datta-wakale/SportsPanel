import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpcenterPopup } from './helpcenter-popup';

describe('HelpcenterPopup', () => {
  let component: HelpcenterPopup;
  let fixture: ComponentFixture<HelpcenterPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpcenterPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpcenterPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
