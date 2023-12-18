import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionAreaComponent } from './option-area.component';

describe('OptionAreaComponent', () => {
  let component: OptionAreaComponent;
  let fixture: ComponentFixture<OptionAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionAreaComponent]
    });
    fixture = TestBed.createComponent(OptionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
