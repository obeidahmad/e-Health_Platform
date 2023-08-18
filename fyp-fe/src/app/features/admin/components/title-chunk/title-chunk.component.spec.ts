import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleChunkComponent } from './title-chunk.component';

describe('TitleChunkComponent', () => {
  let component: TitleChunkComponent;
  let fixture: ComponentFixture<TitleChunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleChunkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleChunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
