import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphWithTitleChunkComponent } from './paragraph-with-title-chunk.component';

describe('ParagraphWithTitleChunkComponent', () => {
  let component: ParagraphWithTitleChunkComponent;
  let fixture: ComponentFixture<ParagraphWithTitleChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphWithTitleChunkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphWithTitleChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
