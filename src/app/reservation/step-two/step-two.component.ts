import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service';
import { Subscription } from 'rxjs';
import { PersonalInfo } from '../../interfaces/personalInfo.interface';

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
  menu = {
    main: [],
    extras: [],
    sides: [],
    others: []
  };
  menuListCatering = {
    catering: [],
    catering_seafood: [],
    catering_kids: [],
    sides: [],
    extras: [],
    others: []
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
    this.httpClient.get<any>('../assets/menu_v2.json').subscribe(data => {
      if (this.pInfo.evtSS === 'Buffet') {
        this.menu.main = data.categories.buffet.main;
        this.menu.extras = data.categories.buffet.extras;
        this.menu.sides = data.categories.sides.main;
        this.menu.others = data.categories.others.main;
      }
      if (this.pInfo.evtSS === 'Catering') {
        this.menuListCatering.catering = data.categories.catering.main;
        this.menuListCatering.catering_seafood = data.categories.catering.seafood;
        this.menuListCatering.catering_kids = data.categories.catering.kids;
        this.menuListCatering.sides = data.categories.sides.main;
        this.menuListCatering.extras = data.categories.others.main;
        this.menuListCatering.others = data.categories.others.catering;
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

  totalSidesSelected:number = 0;
  
  calculateAndNext() {
    this.finalOrderList = [];
    this.total = 0;
    this.totalSidesSelected = 0;
    // Catering
    if (this.pInfo.evtSS == 'Catering') {
      this.menuListCatering.catering.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
      this.menuListCatering.catering_seafood.forEach(element => {
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
          this.totalSidesSelected += Number(element.qty);
          this.finalOrderList.push(element);
        }
        console.log(this.totalSidesSelected);
        this.total += element.qty * element.price
      });
      this.menuListCatering.extras.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
      this.menuListCatering.others.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });
    }
    // Buffet
    if (this.pInfo.evtSS == 'Buffet') {
      this.menu.main.forEach(element => {
        if (element.qty > 0) {
          this.finalOrderList.push(element);
        }
        this.total += element.qty * element.price
      });

      this.menu.sides.forEach(element => {
        if (element.qty > 0) {
          this.totalSidesSelected += Number(element.qty);
          this.finalOrderList.push(element);
        }
        console.log(this.totalSidesSelected);
        this.total += element.qty * element.price;
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
    // console.log(this.finalOrderList);
    this.messageEvent.emit({ price: this.total, step: 'step3', order: this.finalOrderList })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
