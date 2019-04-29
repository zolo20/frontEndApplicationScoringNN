export class Loan {
  typeLoan;
  amount;
  initialFee;
  interestRate;
  creditTerm;


  setValues(typeLoan, amount, initialFee, interestRate, creditTerm) {
    this.typeLoan = typeLoan;
    this.amount = amount;
    this.initialFee = initialFee;
    this.interestRate = interestRate;
    this.creditTerm = creditTerm;
  }
}
