import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footerpart } from './footerpart';

describe('Footerpart', () => {
  let component: Footerpart;
  let fixture: ComponentFixture<Footerpart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footerpart],
    }).compileComponents();

    fixture = TestBed.createComponent(Footerpart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
