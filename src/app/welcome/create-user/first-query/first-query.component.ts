import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirstQuery} from '../../../models/first-query';
import {FIRST_QUERY_QUESTIONS, FirstQueryQuestion} from './first-query-questions';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-create-user-first-query',
  templateUrl: './first-query.component.html',
  styleUrls: ['./first-query.component.scss']
})
export class FirstQueryComponent {

  @Output() firstQueryEventEmitter = new EventEmitter<FirstQuery>();

  private questions = FIRST_QUERY_QUESTIONS;
  public currentQuestion$$ = new BehaviorSubject<FirstQueryQuestion>(this.questions['0']);

  public currentBoolAnswer: '1' | '0' = null;
  public currentTextAnswer = '';
  public counter = 0;

  private result: FirstQuery = {
    Min15MinutesContactWithC19Pat: null,
    NursingActionOnC19Pat: null,
    DirectContactWithLiquidsOfC19Pat: null,
    FlightPassengerWithCloseRowC19Pat: null,
    FlightAsCrewMemberWithC19Pat: null,
    BelongToMedicalStaff: null,
    BelongToNursingStaff: null,
    BelongToLaboratoryStaff: null,
    FamilyMember: null,
    OtherContactType: null,
  };

  constructor() {
  }

  public continue() {
    if (this.counter <= 9) {
      this.result[this.currentQuestion$$.getValue().attributeName] = this.currentBoolAnswer === '1';
      this.currentBoolAnswer = null;
      this.currentTextAnswer = null;
      this.counter++;
      this.currentQuestion$$.next(this.questions[this.counter]);
    }
  }

  public sendFirstQuery() {
    this.firstQueryEventEmitter.next(this.result);
  }

  public disableButton(): boolean {
    if (this.currentQuestion$$.getValue().answerType === 'text') {
      return false;
    }
    if (this.currentQuestion$$.getValue().answerType === 'bool') {
      return this.currentBoolAnswer === null;
    }
  }
}
