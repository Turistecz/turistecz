import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRoutesComponent } from './page-routes.component';

describe('PageRoutesComponent', () => {
  let component: PageRoutesComponent;
  let fixture: ComponentFixture<PageRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRoutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
