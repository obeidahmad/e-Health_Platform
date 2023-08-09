import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphChunkComponent } from './paragraph-chunk.component';

describe('ParagraphChunkComponent', () => {
  let component: ParagraphChunkComponent;
  let fixture: ComponentFixture<ParagraphChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphChunkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
