import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastronomyListComponent } from './gastronomy-list.component';

describe('GastronomyListComponent', () => {
  let component: GastronomyListComponent;
  let fixture: ComponentFixture<GastronomyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastronomyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastronomyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
