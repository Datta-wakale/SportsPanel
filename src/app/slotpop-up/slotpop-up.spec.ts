import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotpopUp } from './slotpop-up';

describe('SlotpopUp', () => {
  let component: SlotpopUp;
  let fixture: ComponentFixture<SlotpopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotpopUp],
    }).compileComponents();

    fixture = TestBed.createComponent(SlotpopUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
