import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrViewComponent } from './dr-view.component';

describe('DrViewComponent', () => {
  let component: DrViewComponent;
  let fixture: ComponentFixture<DrViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
