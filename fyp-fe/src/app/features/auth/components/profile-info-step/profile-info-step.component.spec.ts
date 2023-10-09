import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoStepComponent } from './profile-info-step.component';

describe('ProfileInfoStepComponent', () => {
  let component: ProfileInfoStepComponent;
  let fixture: ComponentFixture<ProfileInfoStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInfoStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
