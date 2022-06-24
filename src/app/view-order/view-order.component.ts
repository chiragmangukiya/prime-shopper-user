import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent implements OnInit {
  constructor(private _http: UserDataService) {}

  pendingOrders: any = [];
  archivedOrders: any = [];

  ngOnInit(): void {
    this._http.getOrders().subscribe((result: any) => {
      if (result.data && result.data.length) {
        result.data.map((item: any, i: any) => {
          let getItem = item;
          let variItem = item.product.product.variations.find((el: any) => {
            return el._id == getItem.product.variation;
          });
          getItem.variations = variItem;

          if (item.status == 'Pending') {
            return this.pendingOrders.push(getItem);
          } else {
            return this.archivedOrders.push(item);
          }
        });
      }
      console.log('pendingOrders::', this.pendingOrders);
      console.log('archivedOrders::', this.archivedOrders);
    });
  }

  getOrderdate(date: any) {
    return moment(date).format('Do MMMM YYYY');
  }
}
