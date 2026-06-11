import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginpopup } from './loginpopup';

describe('Loginpopup', () => {
  let component: Loginpopup;
  let fixture: ComponentFixture<Loginpopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginpopup],
    }).compileComponents();

    fixture = TestBed.createComponent(Loginpopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
