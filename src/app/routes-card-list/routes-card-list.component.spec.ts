import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesCardListComponent } from './routes-card-list.component';

describe('RoutesCardListComponent', () => {
  let component: RoutesCardListComponent;
  let fixture: ComponentFixture<RoutesCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
