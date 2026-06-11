import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSportsComponent } from './listofsports';

describe('Listofsports', () => {
  let component: ListOfSportsComponent;
  let fixture: ComponentFixture<ListOfSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfSportsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfSportsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
