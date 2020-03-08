import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactFormGroup;
  constructor(
    public fb: FormBuilder
  ) {
    this.contactFormGroup = this.fb.group({
      name: '',
      address: ''
    });
  }


  ngOnInit() {
  }

}
