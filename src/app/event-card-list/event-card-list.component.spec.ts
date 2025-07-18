import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardListComponent } from './event-card-list.component';

describe('EventCardListComponent', () => {
  let component: EventCardListComponent;
  let fixture: ComponentFixture<EventCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
