import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-selected-words-area',
  templateUrl: './selected-words-area.component.html',
  styleUrls: ['./selected-words-area.component.css'],
})
export class SelectedWordsAreaComponent implements OnChanges {
  @Input() selectedWordsList: string[] | undefined;

  isSelected: boolean = false; // Başlangıç değeri false olarak atandı

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedWordsList']) {
      this.isSelected = this.selectedWordsList!.length > 0 ? true : false;
    }
  }
}
