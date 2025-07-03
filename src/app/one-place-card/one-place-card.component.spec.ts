import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePlaceCardComponent } from './one-place-card.component';

describe('OnePlaceCardComponent', () => {
  let component: OnePlaceCardComponent;
  let fixture: ComponentFixture<OnePlaceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnePlaceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnePlaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
