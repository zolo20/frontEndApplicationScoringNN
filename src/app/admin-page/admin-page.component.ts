import {Component, OnInit} from '@angular/core';
import {Borrower} from '../common/Borrower';
import {HttpService} from '../common/http.service';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  cols: any[];
  rows: Borrower[];
  frozenCols: any[];
  totalRecords;
  length = 100;
  loading: boolean;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getCountBorrower().subscribe(count => {
      if (parseInt(count.toString()) != 0) {
        this.totalRecords = parseInt(count.toString());
      }
    });

    this.cols = [
      {field: 'beginDateOfSeniority', header: 'Begin Date'},
      {field: 'salary', header: 'Salary'},
      {field: 'certificate', header: 'Certificate'},
      {field: 'otherLoan', header: 'Other Credit'},
      {field: 'dateOfBirth', header: 'Date Of Birth'},
      {field: 'creditHistoryAssessment', header: 'Assessment'},
      {field: 'coBorrowerBeginDateOfSeniority', header: 'Begin Date Co-Borrower'},
      {field: 'coBorrowerSalary', header: 'Salary Co-Borrower'},
      {field: 'coBorrowerCertificate', header: 'Certificate Co-Borrower'},
      {field: 'coBorrowerOtherLoan', header: 'Other Credit Co-Borrower'},
      {field: 'coBorrowerDateOfBirth', header: 'Date Of Birth Co-Borrower'},
      {field: 'coBorrowerCreditHistoryAssessment', header: 'Assessment Co-Borrower'},
      {field: 'loanTypeLoan', header: 'Type Loan'},
      {field: 'loanAmount', header: 'Credit Amount'},
      {field: 'loanInitialFee', header: 'Initial Fee'},
      {field: 'loanInterestRate', header: 'Interest Rate'},
      {field: 'loanCreditTerm', header: 'Credit Term'},
      {field: 'result', header: 'Result'}
    ];

    this.frozenCols = [
      {field: 'id', header: 'Id'}
    ];
    this.loading = true;
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    const cluster = (event.first + 1);
    this.httpService.getLearningData(cluster, this.length).then(rows => {
      this.rows = rows;
    });

    setTimeout(() => {
        this.loading = false;
    }, 2000);
  }
}
