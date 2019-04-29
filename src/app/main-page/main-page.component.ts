import {Component, OnInit } from '@angular/core';
import { MessageService, SelectItem} from 'primeng/api';
import {Borrower} from '../common/Borrower';
import {CoBorrower} from '../common/CoBorrower';
import {Loan} from '../common/Loan';
import {HttpService} from '../common/http.service';

interface TypeLoan {
  name: string;
  code: string;
  amount: number;
  initialFee: number;
  interestRate: number;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  borrower: Borrower = new Borrower();
  coBorrower: CoBorrower = new CoBorrower();
  loan: Loan = new Loan();
  pressGetStartedBoolean = false;

  loans: SelectItem[];
  selectedLoan: TypeLoan;
  regExScoreCrdHis: RegExp = /^[^\D]$/;

  hasCoBorrower = false;

  minAmount = 10_000;
  valAmount = 10_000;
  minInitialFee = 0;
  valInitialFee = 0;
  minInterestRate = 0;
  valInterestRate = 0;
  valCreditTerm = 1;

  disabled = true;
  display = false;
  strAnswer;
  strTextAnswer;

  strScore = '690 - 850 points - This is an excellent score.\n ' +
    '650 - 690 points - Standard score.\n' +
    '600 - 650 points - Satisfactory rating of your credit history.\n' +
    '500 - 600 points - Grade below average\n' +
    '300 - 500 points - Very bad score';

  ngOnInit() {
  }

  constructor(private messageService: MessageService, private httpService: HttpService) {
    this.loans = [
      {label: 'Select Loan', value: null},
      {label: 'Instance Loan', value: {id: 1, name: 'Instance Loan', code: 'IL', amount: 10_000, initialFee: 0, interestRate: 15.0}},
      {label: 'Car Loan', value: {id: 2, name: 'Car Loan', code: 'CL', amount: 100_000, initialFee: 0, interestRate: 15.0}},
      {label: 'Mortgage', value: {id: 3, name: 'Mortgage', code: 'MG', amount: 300_000, initialFee: 60_000, interestRate: 6.5}}
    ];
  }

  setLoan() {
    if (this.selectedLoan != null) {
      this.disabled = false;
      if (this.selectedLoan.amount >= this.valAmount) {
        this.valAmount = this.selectedLoan.amount;
        this.valInitialFee = this.selectedLoan.initialFee;
        this.minInitialFee = this.selectedLoan.initialFee;
      } else {
        if (this.selectedLoan.code == 'MG') {
          const initialFeeForMG =  this.valAmount * 0.2;
          if (this.valInitialFee < initialFeeForMG) {
            this.valInitialFee = initialFeeForMG;
          }
          this.minInitialFee = initialFeeForMG;
        } else {
          if (this.valInitialFee < this.selectedLoan.initialFee) {
            this.valInitialFee = this.selectedLoan.initialFee
          }
          this.minInitialFee = this.selectedLoan.initialFee;
        }
      }
      this.valInterestRate = this.selectedLoan.interestRate;
      this.minInterestRate = this.selectedLoan.interestRate;
      this.minAmount = this.selectedLoan.amount;
    } else {
      this.minAmount = 10_000;
      this.valAmount = 10_000;
      this.minInitialFee = 0;
      this.valInitialFee = 0;
      this.minInterestRate = 0;
      this.valInterestRate = 0;
      this.valCreditTerm = 1;
      this.disabled = true;
    }
  }

  handleChange() {
    if (this.selectedLoan.code == 'MG') {
      const initialFeeForMG =  this.valAmount * 0.2;
      if (this.valInitialFee < initialFeeForMG) {
        this.valInitialFee = initialFeeForMG;
      }
      this.minInitialFee = initialFeeForMG;
    } else {
      if (this.valInitialFee < this.selectedLoan.initialFee) {
        this.valInitialFee = this.selectedLoan.initialFee
      }
      this.minInitialFee = this.selectedLoan.initialFee;
    }

    if (this.valAmount < this.valInitialFee) {
      this.valInitialFee = this.valAmount;
    }
  }

  pressGetStarted() {
    this.pressGetStartedBoolean = true;
  }

  sendRequest() {
    if (this.isValidateAllField()) {
      this.borrower.setObjects(this.coBorrower, this.loan);
      console.log(JSON.stringify(this.borrower));
      this.httpService.predict(this.borrower).subscribe(res=>{
        let answer: boolean = res > 0.5;
        let strAns: string = answer ? 'YES' : 'NO';
        if(answer) {
          this.strTextAnswer = 'Congratulations!';
          this.strAnswer = 'Issue: ' + strAns + ', ' + 'Score: ' + res;
        } else {
          this.strTextAnswer = 'Unfortunately!';
          this.strAnswer = 'Issue: ' + strAns + ', ' + 'Score: ' + res;
        }
        this.display = true;
      });
      this.coBorrower = new CoBorrower();
    }
  }

  isValidateAllField() {
    let valid: boolean = true;
    
    if (!this.borrower.isValidate()) {
      this.messageService.add({key: 'br',severity:'error', summary: 'Borrower failed validate', detail:'To fill all field Borrower\'s'});
      valid = false;
    } else {
      if (this.borrower.creditHistoryAssessment < 300 || this.borrower.creditHistoryAssessment > 850)  {
        this.messageService.add({key: 'br',severity:'error', summary: 'Borrower failed validate', detail:'Credit History Assessment should be in the range of 300 to 850'});
        valid = false;
      }
    }
    
    if (!this.hasCoBorrower) {
      this.coBorrower = null;
    } else {
      if (!this.coBorrower.isValidate()) {
        this.messageService.add({key: 'br',severity:'error', summary: 'Co-Borrower Validate', detail:'To fill all field Co-Borrower\'s'});
        valid = false;
      } else {
        if (this.coBorrower.creditHistoryAssessment < 300 || this.coBorrower.creditHistoryAssessment > 850)  {
          this.messageService.add({key: 'br',severity:'error', summary: 'Co-Borrower failed validate', detail:'Credit History Assessment should be in the range of 300 to 850'});
          valid = false;
        }
      }
    }
    
    if (this.selectedLoan == null) {
      this.messageService.add({key: 'br',severity:'error', summary: 'Error message', detail:'Entry type loan'});
      valid = false;
    } else {
      this.loan.setValues(this.selectedLoan.code,this.valAmount,this.valInitialFee,this.valInterestRate,this.valCreditTerm);
    }
    
    return valid;
  }
}
