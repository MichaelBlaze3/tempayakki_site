import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { EmailService } from '../services/email.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  loading = false;
  supportFormGroup: FormGroup;
  constructor(
    private emailService: EmailService
  ) {}

  patterns = {
    email: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  }

  alert = {
    class: 'danger',
    msg: '',
    active: false
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
    window.scrollTo(0, 0);
    this.loading = true;
    document.body.style.overflow = "hidden";
    this.emailService.supportEmail(fMessage.value).subscribe((data:any) => {
      if(data.status === 200){
        this.alert.class = 'success';
        this.alert.msg = data.msg;
        this.alert.active = true;
        this.loading = false;
        document.body.style.overflow = "auto";
        setTimeout(()=> {
          this.alert.active = false;
        }, 3000);
        this.supportFormGroup.reset();   
      } else {   
        this.alert.class = 'danger';
        this.alert.msg = data.msg;       
        this.alert.active = true;
        this.loading = false;
        document.body.style.overflow = "auto";
        setTimeout(()=> {
          this.alert.active = false;
        }, 3000);
      }
    });
  }

  get emailStatus() {
    return this.supportFormGroup.get('email');
  }

}
