import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleControlComponent } from './module-control.component';

describe('ModuleControlComponent', () => {
  let component: ModuleControlComponent;
  let fixture: ComponentFixture<ModuleControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
