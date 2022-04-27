import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _http: UserDataService) {}
  cartData: any;
  totalPrice: any = 0;

  ngOnInit(): void {
    this._http.cart('').subscribe((result: any) => {
      this.cartData = result.data;
      this.totalPrice = 0;
      this.cartData.map((el: any) => {
        this.totalPrice = this.totalPrice + (el.quantity * el.product.variations[0].price.price_in_india);
      })
      console.log(this.totalPrice);
    });
  }
}
