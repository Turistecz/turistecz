import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardHomeComponent } from './event-card-home.component';

describe('EventCardHomeComponent', () => {
  let component: EventCardHomeComponent;
  let fixture: ComponentFixture<EventCardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
