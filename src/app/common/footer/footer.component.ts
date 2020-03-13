import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private msg: MessengerService
  ) { 
  }

  ngOnInit() {
    console.log(this.msg.getLanguage());
  }


  setLanguage(param: string){
    if(this.msg.setLanguage(param)){
      this.msg.announceNotification(param);
    }
  }
}
