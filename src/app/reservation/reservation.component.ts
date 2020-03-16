import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from '../services/messenger.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor(
    private httpClient: HttpClient,
    private messanger: MessengerService
  ) { 
    this.subscription = messanger.$notification.subscribe(res => {
      this.getContent();
    });
  }
  
  template = {
    contact: {
      header: '',
      name: '',
      last: '',
      addr: '',
      phone: '',
      email: ''
    },
    event: {
      header: '',
      addr:'',
      date:'',
      tte: '',
      gcount: '',
      type: '',
      style: '',
      setup: '',
      comments: ''
    },
    opt: '',
    req: '',
    default: '',
    submit: ''
  }

  ngOnInit() {
    this.getContent();
  }

  getContent(){
    this.httpClient.get('assets/reservation_content.json').subscribe( res => {
      console.log(res);
      if(localStorage.getItem("language") == "es") {
        this.template = res['es'].reservation;
        this.template.opt = res['es'].optional;
        this.template.req = res['es'].required;
        this.template.default = res['es'].select_default;
        this.template.submit = res['es'].submit;
        console.log(this.template);
      } else {
        this.template = res['en'].reservation;
        this.template.opt = res['en'].optional;
        this.template.req = res['en'].required;
        this.template.default = res['en'].select_default;
        this.template.submit = res['en'].submit;
        console.log(this.template);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
