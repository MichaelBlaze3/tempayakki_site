import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes = {
    categories: {
      catering:{
        main: [],
        seafood: [],
        kids: []
      },
      buffet:{
        main:[],
        extras: []
      },
      sides: {
        main: []
      },
      others: {
        main: [],
        catering: []
      }
    }
  };
  isLoaded = false;
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

    // this.httpClient.get('assets/menu.json').subscribe(res => {
    //   console.log(res);
    //   this.dishes = res;
    // });
    console.log(this.isLoaded);
    this.httpClient.get<any>('assets/menu_v2.json').subscribe(res => {
      console.log(res);
      this.dishes.categories.catering.main = res.categories.catering.main;
      this.dishes.categories.catering.seafood = res.categories.catering.seafood;
      this.dishes.categories.catering.kids = res.categories.catering.kids;
      this.dishes.categories.buffet.main = res.categories.buffet.main;
      this.dishes.categories.buffet.extras = res.categories.buffet.extras;
      this.dishes.categories.sides.main = res.categories.sides.main;
      this.dishes.categories.others.main = res.categories.others.main;
      this.dishes.categories.others.catering = res.categories.others.catering;
      this.isLoaded = true;
      console.log(this.isLoaded);
    });
  }

  changeTextBuffetBtn() {
    this.moreOrLessBuffet = !this.moreOrLessBuffet;
  }

  changeTextCateringBtn() {
    this.moreOrLessCatering = !this.moreOrLessCatering;
  }

}
