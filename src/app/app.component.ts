import { ApiService } from './service/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
})
export class AppComponent {
  input: string = '';
  result: string = '';
  lastKey: string;
  formula: string;

  constructor(private apiService: ApiService) {}

  pressNum(num: string) {
    if (num == '0') {
      if (this.input == '') {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (
        PrevKey === '/' ||
        PrevKey === '*' ||
        PrevKey === '-' ||
        PrevKey === '+'
      ) {
        return;
      }
    }

    this.input = this.input + num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
    this.calcAnswer();
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    this.formula = this.input;

    this.lastKey = this.formula[this.formula.length - 1];
    console.log('lastKey ' + this.lastKey);

    if (
      this.lastKey === '/' ||
      this.lastKey === '*' ||
      this.lastKey === '-' ||
      this.lastKey === '+' ||
      this.lastKey === '.'
    ) {
      this.formula = this.formula.substr(0, this.formula.length - 1);
    }
    console.log('Formula ' + this.formula);

    this.result = eval(this.formula);
  }

  getAnswer() {
    this.getResultFromApi(this.input);
 
  }

  pow() {
    this.formula = this.formula.slice(0, -1) + `pow(${this.lastKey},2)`;
    this.input = this.formula;
    console.log('pow Formula ' + this.formula);
  }

  sqrt() {
    this.formula = this.formula.slice(0, -1) + `sqrt(${this.lastKey})`;
    this.input = this.formula;
    console.log('sqrt Formula ' + this.formula);
  }

  getResultFromApi(input: String) {
    console.log('Result from Api : ' + input);
    this.apiService.calculate(input).subscribe((data) => {
      console.log('Result from Api : ' + data['result']);
      this.result = data['result'];
    });
  }
}
