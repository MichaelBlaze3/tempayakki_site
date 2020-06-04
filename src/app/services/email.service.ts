import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private httpClient: HttpClient
  ) { }

  serverIP: string = '192.168.0.12';
  serverPORT: string = '3000';
  serverURL: string = 'http://' + this.serverIP + ':' + this.serverPORT + '/';

  test() {
    return this.httpClient.get(this.serverURL, { responseType: 'text' });
  }

  supportEmail(support) {
    const httpParams = new HttpParams().set('type', 'support').set('fName', support.fName).set('lName', support.lName).set('email', support.email).set('comment', support.comment);
    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(httpParams.toString());
    return this.httpClient.post('http://teppanyaki-catering.com/email/index.php', httpParams.toString(), { headers: headerOptions });
  }

  reservationEmail(reservation) {
    let order_names = [];
    let order_price = [];
    let order_qty = [];
    reservation.order.forEach(element => {
      order_names.push(element.name);
      order_price.push(element.price);
      order_qty.push(element.qty);
    });

    console.log(order_qty);
    console.log(order_names);
    console.log(order_price);

    let headerOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let httpParams = new HttpParams()
      .set('type', 'reservation')
      .set('fName', reservation.personalInfo.fName)
      .set('lName', reservation.personalInfo.lName)
      .set('phone', reservation.personalInfo.phone)
      .set('email', reservation.personalInfo.email)
      .set('addr', reservation.personalInfo.addr)
      .set('zip', reservation.personalInfo.zip)
      .set('city', reservation.personalInfo.city)
      .set('comments', reservation.personalInfo.comments)
      .set('evtAddr', reservation.personalInfo.evtAddr)
      .set('evtZC', reservation.personalInfo.evtZC)
      .set('evtCity', reservation.personalInfo.evtCity)
      .set('evtDate', reservation.personalInfo.evtDate)
      .set('evtGC', reservation.personalInfo.evtGC)
      .set('evtSC', reservation.personalInfo.evtSC)
      .set('evtSS', reservation.personalInfo.evtSS)
      .set('evtTTE', reservation.personalInfo.evtTTE)
      .set('evtToE', reservation.personalInfo.evtToE)
      .set('order_names', order_names.toString())
      .set('order_qty', order_qty.toString())
      .set('order_price', order_price.toString())
      .set('sub', reservation.exp.subtotal)
      .set('tax', reservation.exp.tax)
      .set('eq', reservation.exp.eq)
      .set('total', reservation.exp.total)

      // httpParams.append('order', JSON.stringify(reservation.order));
    return this.httpClient.post('http://teppanyaki-catering.com/email/index.php', httpParams, { headers: headerOptions });
  }

}
