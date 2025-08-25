import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRoutesCardComponent } from './page-routes-card.component';

describe('PageRoutesCardComponent', () => {
  let component: PageRoutesCardComponent;
  let fixture: ComponentFixture<PageRoutesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRoutesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRoutesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
