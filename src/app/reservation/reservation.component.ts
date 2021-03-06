import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { Router, NavigationEnd } from '@angular/router';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(StepOneComponent, { static: false }) stepOne: StepOneComponent;
  @ViewChild(StepTwoComponent, { static: false }) stepTwo: StepOneComponent;
  @ViewChild(StepThreeComponent, { static: false }) stepThree: StepOneComponent;

  constructor(
    private router: Router
  ) { }
  alert = {
    class: 'danger',
    msg: '',
    active: false
  }
  personalInformationObj: any;
  activeChild = "step1";
  total = 0;
  order = [];
  skip = false;
  
  receiveMessage($event) {
    this.personalInformationObj = $event.pInfo;
    this.activeChild = $event.step;
    this.total = $event.price;
  }

  receiveMessageTwo($event) {
    this.activeChild = $event.step;
    this.total = $event.price;
    this.order = $event.order;
    this.skip = $event.skip;
    console.log($event);
  }

  alertStatus($event) {
    this.alert.class = $event.class;
    this.alert.msg = $event.msg;
    this.alert.active = true;
    setTimeout(() => {
      this.alert.active = false;
    }, 3000);

  }

  resetReservation($event) {
    this.activeChild = 'step1';
  }

  ngAfterViewInit() { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  ngOnDestroy() {
  }

}
