import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignformComponent } from './sign-form.component';

describe('SignformComponent', () => {
  let component: SignformComponent;
  let fixture: ComponentFixture<SignformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
