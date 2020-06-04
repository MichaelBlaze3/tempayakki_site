import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service';
import { EmailService } from 'src/app/services/email.service';
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
export interface Exp {
  subtotal: number,
  tax: number,
  total: number,
  eq: number
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
  @Output() messageEvent = new EventEmitter<object>();
  @Output() resetEvent = new EventEmitter<object>();

  constructor(
    private httpClient: HttpClient,
    private messanger: MessengerService,
    private emailService: EmailService
  ) {
    this.subscription = messanger.$notification.subscribe(res => {
      this.getContent();
    });
  }
  loading = false;
  subscription: Subscription;
  template = {
    previous: '',
    next: '',
    submit: ''
  }
  summary: any = {
    personalInfo: [],
    order: [],
    total: 0,
    exp: {
      subtotal: '',
      tax: '',
      total: '',
      eq: ''
    }
  }
  expenses = {
    subtotal: 0.0,
    tax: 0.0,
    total: 0.0,
    eq: 0.0
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

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getContent();
    this.summary.total = this.total;
    this.summary.personalInfo = this.pInfo;
    this.summary.order = this.order;
    this.expenses.subtotal = this.total;
    this.expenses.tax = this.getTax();
    if(this.summary.personalInfo.evtSS == 'Buffet'){
      this.expenses.eq = this.getEqAndLabor()
    }
    this.expenses.total = this.expenses.tax + this.expenses.subtotal + this.expenses.eq;
    this.summary.exp.subtotal = this.expenses.subtotal.toFixed(2);
    this.summary.exp.tax = this.expenses.tax.toFixed(2);
    this.summary.exp.eq = this.expenses.eq.toFixed(2);
    this.summary.exp.total = this.expenses.total.toFixed(2);
  }

  finish() {
    window.scrollTo(0, 0);
    this.loading = true;
    // document.body.style.overflow = "hidden";
    this.emailService.reservationEmail(this.summary).subscribe((data: any) => {
      if (data.status === 200) {
        this.loading = false;
        // document.body.style.overflow = "auto";
        this.messageEvent.emit({ class: 'success', msg: data.msg });
        this.reset('complete');
      } else {
        this.loading = false;
        // document.body.style.overflow = "auto";
        this.messageEvent.emit({ class: 'danger', msg: data.msg });
      }
    });
  }

  getTax(){
    return this.total * 0.0875;
  }

  getEqAndLabor(){
    return this.total * 0.1;
  }

  checked = false;
  toogleBtn() {
    this.checked = !this.checked;
  }

  reset(opt) {
    this.resetEvent.emit({ origin: opt });
  }

}
