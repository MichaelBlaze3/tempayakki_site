import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { EmailService } from '../services/email.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  supportFormGroup: FormGroup;
  constructor(
    private emailService: EmailService
  ) {}

  patterns = {
    email: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  }
  ngOnInit() {
    this.supportFormGroup = new FormGroup({
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.patterns.email)]),
      comment: new FormControl('', Validators.required)
    });
  }

  submitMessage(fMessage):void {
    console.log(fMessage.value);
    this.emailService.supportEmail(fMessage.value).subscribe(data => {
      console.log(data);
    });
  }

  get emailStatus() {
    return this.supportFormGroup.get('email');
  }

}
