import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDetailCardComponent } from './front-detail-card.component';

describe('FrontDetailCardComponent', () => {
  let component: FrontDetailCardComponent;
  let fixture: ComponentFixture<FrontDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontDetailCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
