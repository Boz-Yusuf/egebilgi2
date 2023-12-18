import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { response } from 'express';
import { ApiCallsService } from '../sentence/services/api-calls.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  data: any;
  sentence: any;

  constructor(
    private dataService: DataService,
    private apiCallService: ApiCallsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
    });
  }
}
