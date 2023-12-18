import { Injectable } from '@angular/core';
import { AnswerSet } from './models/AnswerSet.model';

const setColor: string[] = [
  '#02B67D',
  '#0077CC',
  '#EFBC06',
  '#6C6EB2',
  '#E02947',
];

@Injectable({
  providedIn: 'root',
})
export class AnswerSetsService {
  constructor() {
    this.addAnswerSet(this.pos);
    this.addAnswerSet(this.ner);
  }

  // todo => import from json file

  pos: AnswerSet = {
    name: 'pos',
    answers: [
      ['Özne', 'subject', setColor[0]],
      ['Nesne', 'object', setColor[1]],
      ['Yüklem', 'verb', setColor[2]],
    ],
  };

  ner: AnswerSet = {
    name: 'ner',

    answers: [
      ['Kişi', 'person', setColor[0]],
      ['Yer', 'place', setColor[1]],
      ['Zaman', 'time', setColor[2]],
    ],
  };

  answerSetList: AnswerSet[] = [];
  addAnswerSet(answerSet: AnswerSet) {
    this.answerSetList.push(answerSet);
  }

  getAnswerSetByName(name: string): AnswerSet | null {
    const foundAnswerSet: AnswerSet | undefined = this.answerSetList.find(
      (answerSet) => answerSet.name === name
    );
    return foundAnswerSet || null;
  }
}
