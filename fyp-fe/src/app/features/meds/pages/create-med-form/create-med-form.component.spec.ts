import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedFormComponent } from './create-med-form.component';

describe('CreateMedFormComponent', () => {
  let component: CreateMedFormComponent;
  let fixture: ComponentFixture<CreateMedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
