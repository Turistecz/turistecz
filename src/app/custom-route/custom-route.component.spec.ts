import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRouteComponent } from './custom-route.component';

describe('CustomRouteComponent', () => {
  let component: CustomRouteComponent;
  let fixture: ComponentFixture<CustomRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
