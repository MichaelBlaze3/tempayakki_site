import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
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
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit, OnDestroy {

  @Output() messageEvent = new EventEmitter<object>();
  @Input() pInfo: PersonalInfo;

  constructor(
    private httpClient: HttpClient,
    private messanger: MessengerService
  ) {
    this.subscription = messanger.$notification.subscribe(res => {
      this.getContent();
    });
  }

  finalOrderList = [];

  total: number = 0;
  menu: any;
  menuListCatering = {
    catering: [],
    sides: []
  }
  subscription: Subscription;
  template = {
    previous: '',
    next: '',
    submit: ''
  }
  available = false;
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getMenu();
    this.getContent();
  }

  getMenu() {
    console.log("Buffet");
    this.httpClient.get<any>('../assets/menu.json').subscribe(data => {
      console.log(data);
      if (this.pInfo.evtSS === 'Buffet') {
        this.menu = data.categories[0].buffet;
      }
      if (this.pInfo.evtSS === 'Catering') {
        // this.menu = data.categories[0].catering
        this.menuListCatering.catering = data.categories[0].catering;
        this.menuListCatering.sides = data.categories[0].buffet.sides;
      }
      this.available = true;
    });
  }


  getContent() {
    this.httpClient.get('../assets/reservation_content.json').subscribe(res => {
      console.log(res);
      if (localStorage.getItem("language") == "es") {
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

  calculateAndNext() {
    if (this.pInfo.evtSS == 'Catering') {
      this.menuListCatering.catering.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
      this.menuListCatering.sides.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
      console.log(this.total);
    }
    if (this.pInfo.evtSS == 'Buffet') {
      this.menu.main.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        console.log(element);
        this.total += element.qty * element.price
      });

      this.menu.kids.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });

      this.menu.sides.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
      console.log(this.total);
    }
    this.next();
  }

  next() {
    console.log(this.menu);
    console.log(this.total);
    console.log(this.finalOrderList);
    this.messageEvent.emit({ price: this.total, step: 'step3', order: this.finalOrderList })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
