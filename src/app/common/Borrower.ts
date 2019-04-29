import {CoBorrower} from './CoBorrower';
import {Loan} from './Loan';

export class Borrower {
  id;
  beginDateOfSeniority = null;
  salary = null;
  certificate: boolean = false;
  otherLoan: boolean = false;
  dateOfBirth = null;
  creditHistoryAssessment = null;
  coBorrower: CoBorrower;
  loan: Loan;
  result;

  setObjects(coBorrower: CoBorrower, loan: Loan) {
    this.coBorrower = coBorrower;
    this.loan = loan;
  }

  isValidate() {
    return !(this.beginDateOfSeniority == null || this.salary == null ||
      this.dateOfBirth == null || this.creditHistoryAssessment == null);
  }
}
