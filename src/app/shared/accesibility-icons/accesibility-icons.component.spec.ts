import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesibilityIconsComponent } from './accesibility-icons.component';

describe('AccesibilityIconsComponent', () => {
  let component: AccesibilityIconsComponent;
  let fixture: ComponentFixture<AccesibilityIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesibilityIconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesibilityIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
