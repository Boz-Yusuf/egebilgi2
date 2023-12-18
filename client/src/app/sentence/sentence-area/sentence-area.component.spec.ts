import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceAreaComponent } from './sentence-area.component';

describe('SentenceAreaComponent', () => {
  let component: SentenceAreaComponent;
  let fixture: ComponentFixture<SentenceAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentenceAreaComponent]
    });
    fixture = TestBed.createComponent(SentenceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
