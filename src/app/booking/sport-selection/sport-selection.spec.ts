import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSelection } from './sport-selection';

describe('SportSelection', () => {
  let component: SportSelection;
  let fixture: ComponentFixture<SportSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(SportSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
