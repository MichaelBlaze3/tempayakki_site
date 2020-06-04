import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service';
import { Subscription } from 'rxjs';
export interface PersonalInfo {
  fName: string,
  lName: string,
  addr: string,
  phone: string,
  city: string,
  zip: number,
  email: string,
  evtAddr: string,
  evtCity: string,
  evtZC: number,
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
    catering_kids: [],
    sides: [],
    extras: []
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

  valueUpdated(){
    this.calculateAndNext();
  }

  getMenu() {
    this.httpClient.get<any>('../assets/menu.json').subscribe(data => {
      if (this.pInfo.evtSS === 'Buffet') {
        this.menu = data.categories[0].buffet;
        this.menu.others = data.categories[0].extras.buffet;
      }
      if (this.pInfo.evtSS === 'Catering') {
        this.menuListCatering.catering = data.categories[0].catering;
        this.menuListCatering.catering_kids = data.categories[0].catering_kids;
        this.menuListCatering.sides = data.categories[0].buffet.sides;
        this.menuListCatering.extras = data.categories[0].extras.catering;
      }
      this.available = true;
    });
  }


  getContent() {
    this.httpClient.get('../assets/reservation_content.json').subscribe(res => {
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
    this.finalOrderList = [];
    this.total = 0;
    if (this.pInfo.evtSS == 'Catering') {
      this.menuListCatering.catering.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
      this.menuListCatering.catering_kids.forEach(element => {
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
      this.menuListCatering.extras.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
    }
    if (this.pInfo.evtSS == 'Buffet') {
      this.menu.main.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
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

      this.menu.extras.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });

      this.menu.others.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
    }
  }

  next() {
    this.messageEvent.emit({ price: this.total, step: 'step3', order: this.finalOrderList })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
