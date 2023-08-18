import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithCaptionChunkComponent } from './image-with-caption-chunk.component';

describe('ImageWithCaptionChunkComponent', () => {
  let component: ImageWithCaptionChunkComponent;
  let fixture: ComponentFixture<ImageWithCaptionChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageWithCaptionChunkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageWithCaptionChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
