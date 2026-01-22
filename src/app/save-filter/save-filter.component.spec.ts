import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFilterComponent } from './save-filter.component';

describe('SaveFilterComponent', () => {
  let component: SaveFilterComponent;
  let fixture: ComponentFixture<SaveFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
