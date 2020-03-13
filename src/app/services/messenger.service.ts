import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private languageChangeNotification = new Subject<string>();

  $notification = this.languageChangeNotification.asObservable();

  announceNotification(msg: string) {
    console.log(msg);
    this.languageChangeNotification.next(msg);
  }

  getLanguage(){
    return localStorage.getItem('language');
  }

  setLanguage(param: string) {
    localStorage.setItem('language', param);
    let temp_language = this.getLanguage();
    if(temp_language === param) {
      return true;
    } else {
      return false;
    }
  }

}
