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
    private messanger: MessengerService,
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

  ngOnInit() {
    this.getContent();
    this.contactFormGroup = new FormGroup({
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      addr: new FormControl ('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      evtAddr: new FormControl('', Validators.required),
      evtDate: new FormControl('', Validators.required),
      evtTTE: new FormControl('', Validators.required),
      evtGC: new FormControl('0', Validators.required),
      evtToE: new FormControl('', Validators.required),
      evtSS: new FormControl('', Validators.required),
      evtSC: new FormControl('', Validators.required)
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
    this.messageEvent.emit({pInfo: this.contactFormGroup.value, step: 'step2'});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
