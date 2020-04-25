import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service';
import { Subscription } from 'rxjs';

export interface PersonalInfo {
  fName: string,
  lName: string,
  addr: string,
  phone: string,
  email: string,
  evtAddr: string,
  evtDate: Date,
  evtGC: number,
  evtSC: string,
  evtSS: string,
  evtTTE: string,
  evtToE: string
}

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {

  @Input() pInfo: any;
  @Input() total: number;
  @Input() order: [];
  constructor(
    private httpClient: HttpClient,
    private messanger: MessengerService
  ) { 
    this.subscription = messanger.$notification.subscribe(res => {
      this.getContent();
    });
  }

  subscription: Subscription;
  template = {
    previous: '',
    next:'',
    submit: ''
  }

  getContent(){
    this.httpClient.get('../assets/reservation_content.json').subscribe( res => {
      if(localStorage.getItem("language") == "es") {
        this.template.previous = res['es'].previous;
        this.template.next = res['es'].next;
        this.template.submit = res['es'].submit;
      } else {
        this.template.previous = res['en'].previous;
        this.template.next = res['en'].next;
        this.template.submit = res['en'].submit;
      }
    });
  }

  ngOnInit() {
    this.getContent();
    console.log(this.total);
    console.log(this.pInfo);
    console.log(this.order);
  }

  finish(){
    alert('Information will be submited');
  }

}
