import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headerpart } from './headerpart';

describe('Headerpart', () => {
  let component: Headerpart;
  let fixture: ComponentFixture<Headerpart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headerpart],
    }).compileComponents();

    fixture = TestBed.createComponent(Headerpart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
