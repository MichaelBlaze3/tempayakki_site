import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(StepOneComponent, {static: false}) stepOne: StepOneComponent;
  @ViewChild(StepTwoComponent, {static: false}) stepTwo: StepOneComponent;
  @ViewChild(StepThreeComponent, {static: false}) stepThree: StepOneComponent;

  constructor() { }
  personalInformationObj: any;
  activeChild = "step1";
  total = 0;
  order = [];
  receiveMessage($event) {
    this.personalInformationObj = $event.pInfo;
    this.activeChild = $event.step;
    this.total = $event.price;
  }

  receiveMessageTwo($event){
    this.activeChild = $event.step;
    this.total = $event.price;
    this.order = $event.order;
  }

  ngAfterViewInit() {}
 
  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
