import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedWordsAreaComponent } from './selected-words-area.component';

describe('SelectedWordsAreaComponent', () => {
  let component: SelectedWordsAreaComponent;
  let fixture: ComponentFixture<SelectedWordsAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedWordsAreaComponent]
    });
    fixture = TestBed.createComponent(SelectedWordsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
