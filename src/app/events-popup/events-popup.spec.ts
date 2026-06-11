import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPopup } from './events-popup';

describe('EventsPopup', () => {
  let component: EventsPopup;
  let fixture: ComponentFixture<EventsPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
