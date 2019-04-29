import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Borrower} from './Borrower';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  getLearningData(id: number, length: number) {
    return this.http.get('http://localhost:8080/application-nn/java/borrower?id=' + id +'&length=' + length)
      .toPromise()
      .then(res => <Borrower[]> res)
      .then(data => {
        return data;
      });
  }

  getCountBorrower() {
    return this.http.get('http://localhost:8080/application-nn/java/borrower/count');
  }

  predict(request:any) {
    return this.http.post('http://localhost:8080/application-nn/java/predict', JSON.stringify(request),
      {headers: {'Content-Type': 'application/json'}});
  }

}
