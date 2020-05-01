import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private httpClient: HttpClient
  ) { }

    serverIP: string = '192.168.0.12';
    serverPORT: string = '3000';
    serverURL: string = 'http://'+this.serverIP+':'+this.serverPORT+'/';

  test(){
    return this.httpClient.get(this.serverURL, {responseType: 'text'});
  }

  supportEmail(support){
    return this.httpClient.post(this.serverURL+"support", support);
  }

  reservationEmail(reservation){
    console.log(reservation);
    return this.httpClient.post(this.serverURL+"reservation", reservation);
  }

}
