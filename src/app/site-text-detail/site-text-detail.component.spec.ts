import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTextDetailComponent } from './site-text-detail.component';

describe('SiteTextDetailComponent', () => {
  let component: SiteTextDetailComponent;
  let fixture: ComponentFixture<SiteTextDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteTextDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteTextDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
