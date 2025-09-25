import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPadreComponent } from './calendar-padre.component';

describe('CalendarPadreComponent', () => {
  let component: CalendarPadreComponent;
  let fixture: ComponentFixture<CalendarPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarPadreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
