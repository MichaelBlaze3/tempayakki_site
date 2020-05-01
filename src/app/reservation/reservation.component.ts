import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { Router, NavigationEnd } from '@angular/router';
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
  
  receiveMessage($event) {
    this.personalInformationObj = $event.pInfo;
    this.activeChild = $event.step;
    this.total = $event.price;
  }

  receiveMessageTwo($event) {
    this.activeChild = $event.step;
    this.total = $event.price;
    this.order = $event.order;
  }

  alertStatus($event) {
    console.log($event);
    this.alert.class = $event.class;
    this.alert.msg = $event.msg;
    this.alert.active = true;
    setTimeout(() => {
      this.alert.active = false;
    }, 5000);

  }

  resetReservation($event) {
    console.log($event);
    if ($event.origin === 'cancel') {
      this.activeChild = 'step1';
    }
    if($event.origin === 'complete') {
      setTimeout(()=> {
        this.activeChild = 'step1';
      }, 5000);
    }
    console.log("Reseting reservation");
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
