import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCardListComponent } from './place-card-list.component';

describe('PlaceCardListComponent', () => {
  let component: PlaceCardListComponent;
  let fixture: ComponentFixture<PlaceCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
