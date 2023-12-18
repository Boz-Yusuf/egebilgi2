import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AnswerSetsService } from '../answer-sets.service';
import { AnswerSet } from '../models/AnswerSet.model';

@Component({
  selector: 'app-option-area',
  templateUrl: './option-area.component.html',
  styleUrls: ['./option-area.component.css'],
})
export class OptionAreaComponent implements OnInit {
  @Input() questionType!: string;
  @Output() giveAnswer: EventEmitter<[string, string]> = new EventEmitter();
  constructor(private answerSetsService: AnswerSetsService) {}

  // todo  Interface yaz
  answerSet!: any;
  ngOnInit(): void {
    this.answerSet = this.answerSetsService.getAnswerSetByName(
      this.questionType
    )?.answers;
  }

  sendLabel(label: string, type: string) {
    this.giveAnswer.emit([label, type]);
  }
}
