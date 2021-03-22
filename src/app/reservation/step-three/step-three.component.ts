import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service';
import { EmailService } from 'src/app/services/email.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface PersonalInfo {
  fName: string,
  lName: string,
  phone: string,
  email: string,
  evtAddr: string,
  evtCity: string,
  evtZC: number,
  evtDate: Date,
  evtGC: number,
  evtSC: object,
  evtSS: string,
  evtTTE: string,
  evtToE: string,
  evtIsSurprise: boolean,
  evtAccesibility: string,
  comments: string
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
  @Input() skip: boolean = false;
  @Output() messageEvent = new EventEmitter<object>();
  @Output() resetEvent = new EventEmitter<object>();
  @ViewChild("mdlBtn", {static: true}) mdlBtn: ElementRef<any>;

  constructor(
    private httpClient: HttpClient,
    private messanger: MessengerService,
    private emailService: EmailService,
    private router: Router
  ) {
    this.subscription = messanger.$notification.subscribe(res => {
      this.getContent();
    });
  }
  progressBar: number = 1;
  isModalHidden = true;
  loading = false;
  subscription: Subscription;
  checked = false;
  template = {
    previous: '',
    next: '',
    submit: ''
  }
  summary: any = {
    personalInfo: [],
    order: [],
    total: 0,
    skip: false,
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
    this.summary.skip = this.skip;
    this.summary.total = this.total;
    this.summary.personalInfo = this.pInfo;
    if(!this.summary.skip) {
      this.summary.order = this.order;
      this.expenses.subtotal = this.total  + (this.summary.personalInfo.evtSC.price > 0 ? this.summary.personalInfo.evtSC.price  : 0);
      this.expenses.tax = this.getTax();
      if(this.summary.personalInfo.evtSS == 'Buffet'){
        this.expenses.eq = this.getEqAndLabor()
      }
      this.expenses.total = this.expenses.tax + this.expenses.subtotal + this.expenses.eq;
      this.summary.exp.subtotal = this.expenses.subtotal.toFixed(2);
      this.summary.exp.tax = this.expenses.tax.toFixed(2);
      this.summary.exp.eq = this.expenses.eq.toFixed(2);
      this.summary.exp.total = this.expenses.total.toFixed(2);
    } else {
      this.summary.exp.subtotal  = 0;
      this.summary.exp.tax  = 0;
      this.summary.exp.eq = 0;
      this.summary.exp.total = 0;
    }

  }

  alertMessage = {
    header: 'Please wait',
    msg: 'Sending reservation'
  }

  finish() {
    window.scrollTo(0, 0);
    this.loading = true;
    this.emailService.reservationEmail(this.summary).subscribe((data: any) => {
      if (data.status == 200) {
        this.mdlBtn.nativeElement.click();
        this.progressBar = 100;
        this.alertMessage.header = 'Done!';
        this.alertMessage.msg = 'Your reservation is complete. Sent a copy of the order to ';

      } else {
        this.mdlBtn.nativeElement.click();
        this.progressBar = 0;
        this.alertMessage.header = 'Ups!';
        this.alertMessage.msg = 'There was an error with your reservation. Please try again or contact support.';
      }
    });
  }

  getTax(){
    return this.total * 0.0875;
  }

  getEqAndLabor(){
    return this.total * 0.1;
  }

  toogleBtn() {
    this.checked = !this.checked;
  }

  reset(opt) {
    this.resetEvent.emit({ origin: opt });
  }

  goToSupport(){
    this.router.navigate(['/contact']);
  }

}
