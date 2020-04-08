import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes;
  moreOrLessBuffet = false;
  moreOrLessCatering = false;
  constructor(
    // private router: Router,
    private httpClient: HttpClient
  ) { }

  /**
   * @todo Enable download PDF
   * @todo Add language support
   * @todo Apply font for styles
   */

  ngOnInit() {

    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0)
    // });

    this.httpClient.get('assets/menu.json').subscribe(res => {
      console.log(res);
      this.dishes = res;
    });
  }

  changeTextBuffetBtn() {
    this.moreOrLessBuffet = !this.moreOrLessBuffet;
  }

  changeTextCateringBtn() {
    this.moreOrLessCatering = !this.moreOrLessCatering;
  }

}
