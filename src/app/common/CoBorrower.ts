export class CoBorrower {
  beginDateOfSeniority = null;
  salary = null;
  certificate: boolean = null;
  otherLoan: boolean = null;
  dateOfBirth = null;
  creditHistoryAssessment = null;

  isValidate() {
    return !(this.beginDateOfSeniority == null || this.salary == null ||
      this.dateOfBirth == null || this.creditHistoryAssessment == null);
  }
}
