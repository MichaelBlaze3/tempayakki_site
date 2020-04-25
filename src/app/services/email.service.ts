import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private httpClient: HttpClient
  ) { }

  test(){
    return this.httpClient.get("http://localhost:3000/", {responseType: 'text'});
  }

  supportEmail(support){
    return this.httpClient.post("http://localhost:3000/support", support);
  }

}
