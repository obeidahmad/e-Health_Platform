import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChunkComponent } from './image-chunk.component';

describe('ImageChunkComponent', () => {
  let component: ImageChunkComponent;
  let fixture: ComponentFixture<ImageChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageChunkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
