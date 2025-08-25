import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonumentComponent } from './monument.component';

describe('MonumentComponent', () => {
  let component: MonumentComponent;
  let fixture: ComponentFixture<MonumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
