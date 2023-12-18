import { Component, OnInit } from '@angular/core';
import { wordButton, } from '../models/word-button';
import { ActivatedRoute } from '@angular/router';
import { ApiCallsService } from '../services/api-calls.service';
import { AuthService } from 'src/app/global/service/auth.service';
import { answer,result } from '../models/answer.model';

@Component({
  selector: 'app-sentence-area',
  templateUrl: './sentence-area.component.html',
  styleUrls: ['./sentence-area.component.css'],
})
export class SentenceAreaComponent implements OnInit {
  wordList: wordButton[] = [];
  selectedWordIdList: number[] = [];
  currentSelection: string[] = [];
  answerType: string = '';
  data: any;
  myList: string[] = [];

  content_id!: string;


  constructor(
    private route: ActivatedRoute,
    private dataService: ApiCallsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.answerType = this.route.snapshot.data['message'];
    if (this.answerType === 'ner') this.getNerSentence();
    else this.getPosSentence();
  }

  //* || CREATE PAGE COMPONENT

  // This function created button for each word in the sentence
  createButtonList() {
    this.myList.forEach((element) => {
      this.wordList.push({
        content: element,
        label: '',
        available: true,
        backgroundColor: '#F8F9FA',
      });
    });
  }

  //* || WORD SELECTION FUNCS

  // This function make selection
  selectWord(event: any): void {
    const clickedElementId = event.target.id;
    this.selectedWordIdList.push(Number(clickedElementId));
    this.lockButton(clickedElementId);
    this.findCurrentSelection();
  }

  // This function lock the words that should not be sellected
  lockButton(index: number) {
    if (this.selectedWordIdList.length === 1) {
      // first sellection
      // locks all buttons
      for (let i = 0; i < this.wordList.length; i++) {
        this.wordList[i].available = false;
      }
      // unlock next button
      if (Number(index) + 1 !== this.wordList.length)
        this.unlock(this.selectedWordIdList[0] + 1);
      // unlock previous button
      if (Number(index) - 1 !== -1) this.unlock(this.selectedWordIdList[0] - 1);
    } else {
      // at least one word was sellected
      // lock sellected index
      this.wordList[index].available = false;
      if (
        index > this.selectedWordIdList[0] &&
        Number(index) + 1 !== this.wordList.length
      )
        this.unlock(Number(index) + 1);
      if (index < this.selectedWordIdList[0] && Number(index) - 1 !== -1)
        this.unlock(Number(index) - 1);
    }
    this.selectedWordIdList.sort(function (a, b) {
      return a - b;
    });
  }

  unlock(index: number) {
    if (this.wordList[index].label === '')
      this.wordList[index].available = true;
  }

  // This function gives color if button was selected
  isButtonSelected(index: number): boolean {
    if (this.selectedWordIdList.includes(index)) {
      return true;
    }
    return false;
  }

  // This function labels subsentence
  createFragment(option: [label: string, color: string]) {
    for (let i = 0; i < this.selectedWordIdList.length; i++) {
      if (i === 0) {
        this.wordList[this.selectedWordIdList[i]].label = 'b-' + option[0];
        this.wordList[this.selectedWordIdList[i]].backgroundColor = option[1];
      } else {
        this.wordList[this.selectedWordIdList[i]].label = option[0];
        this.wordList[this.selectedWordIdList[i]].backgroundColor = option[1];
      }
    }
    this.selectedWordIdList = [];
    this.currentSelection = [];
    this.Reselect();
  }

  findCurrentSelection() {
    this.currentSelection = [];
    this.selectedWordIdList.forEach((element) => {
      this.currentSelection.push(this.wordList[element].content);
    });
  }

  // This function allow usersto reselect items
  Reselect() {
    this.selectedWordIdList = [];
    this.currentSelection = [];
    this.wordList.forEach((element) => {
      if (element.label === '') element.available = true;
    });
  }

  //This function allow users to clean all selections
  Cancel() {
    this.wordList = [];
    this.createButtonList();
    this.selectedWordIdList = [];
    this.currentSelection = [];
  }

  //* || REQUEST FUNCS CALLS

  getPosSentence() {
    try {
      this.dataService.getPosData().then((response) => {
        const responseData = response[0][0];
        this.content_id = responseData.content_id;
        let responseList: string[] = responseData.tokens;
        this.myList = this.myList.concat(responseList);
        this.createButtonList();
      });
    } catch (error) {
      console.log('heyyo')
    }
    
  }

  getNerSentence() {
    this.dataService.getNerData().then((response) => {
      const responseData = response[0][0];
      this.content_id = responseData.content_id;
      let responseList: string[] = responseData.tokens;
      this.myList = this.myList.concat(responseList);
      this.createButtonList();
    });
  }

  sendPosSentence(result:result) {
    this.dataService.sendPosData(result).then((response) => {
    });
  }

  sendNerSentence(result:result) {
    this.dataService.sendNerData(result).then((response) => {
    });
  }


  createAnswer() {
    const answer: answer  = {};
 
    this.wordList.forEach((element, index) => {
      const key = (index + 1).toString();
      answer[key] = {
        word: element.content,
        label: element.label,
      };
    });
    return answer;
  }


  //* || SEND ANSWER
  complate(){
    const userAnswer: answer = this.createAnswer();
    
    const result: result = { answer: userAnswer, content_id: this.content_id.toString() }
    
     if (this.answerType === 'pos') this.sendPosSentence(result);
     else this.sendNerSentence(result);

  }
}
