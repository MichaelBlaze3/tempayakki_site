import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit, OnDestroy {
  contactFormGroup: FormGroup;
  subscription: Subscription;

  @Output() messageEvent = new EventEmitter<object>();

  constructor(
    private httpClient: HttpClient,
    private messanger: MessengerService
  ) {
    this.subscription = messanger.$notification.subscribe(res => {
      this.getContent();
    });
  }

  patterns = {
    email: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
      type: {
        label: '',
        items: []
      },
      style: {
        label: '',
        items: []
      },
      setup: {
        label: '',
        items: []
      },
      comments: {
        label: '',
        placeholder:''
      }
    },
    opt: '',
    req: '',
    default: '',
    previous: '',
    next:'',
    submit: ''
  }

  minGuest = 0;
  zipValue = 0;
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getContent();
    this.contactFormGroup = new FormGroup({
      fName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      lName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      addr: new FormControl ('', [Validators.required, Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      zip: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.patterns.email)]),
      evtAddr: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      evtCity: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      evtZC: new FormControl('', [Validators.required]),
      evtDate: new FormControl('', Validators.required),
      evtTTE: new FormControl('', Validators.required),
      evtGC: new FormControl(this.minGuest, Validators.required),
      evtToE: new FormControl('', Validators.required),
      evtSS: new FormControl('', Validators.required),
      evtSC: new FormControl('', Validators.required),
      evtIsSurprise: new FormControl(false),
      comments: new FormControl('', Validators.maxLength(150))
    });
  }

  getContent(){
    this.httpClient.get('assets/reservation_content.json').subscribe( res => {
      console.log(res);
      if(localStorage.getItem("language") == "es") {
        this.template = res['es'].reservation;
        this.template.opt = res['es'].optional;
        this.template.req = res['es'].required;
        this.template.default = res['es'].select_default;
        this.template.previous = res['es'].previous;
        this.template.next = res['es'].next;
        this.template.submit = res['es'].submit;
      } else {
        this.template = res['en'].reservation;
        this.template.opt = res['en'].optional;
        this.template.req = res['en'].required;
        this.template.default = res['en'].select_default;
        this.template.previous = res['en'].previous;
        this.template.next = res['en'].next;
        this.template.submit = res['en'].submit;
      }
    });
  }

  next() {
    console.log(this.contactFormGroup.value);
    console.log(this.contactFormGroup.value.evtSC);
    this.messageEvent.emit({pInfo: this.contactFormGroup.value, step: 'step2'});
  }

  updateGuestCount(sstype){
    if(sstype == 'Catering'){
      this.minGuest = 12;
      this.contactFormGroup.get('evtGC').setValue(12);
    }
    if(sstype == 'Buffet'){
      this.minGuest = 50;
      this.contactFormGroup.get('evtGC').setValue(50);
    }
  }

  validateGC(evt, val) {
    if(evt == 'Buffet'){
      if(val < 50){
        this.contactFormGroup.get('evtGC').setValue(50);
        this.minGuest = 50;
      } else {
        this.minGuest = val;
      }
    }
    if(evt == 'Catering') {
      if(val < 10){
        this.contactFormGroup.get('evtGC').setValue(12);
      } else {
        this.minGuest = val;
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
