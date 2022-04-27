import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _http: UserDataService) {}
  cartData: any;
  totalPrice: any = 0;

  paymentHandler: any = null;

  success: boolean = false

  failure:boolean = false

  ngOnInit(): void {
    this._http.cart('').subscribe((result: any) => {
      this.cartData = result.data;
      this.totalPrice = 0;
      this.cartData.map((el: any) => {
        this.totalPrice =
          this.totalPrice +
          el.quantity * el.product.variations[0].price.price_in_india;
      });
    });

    this.invokeStripe();
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KsmT8SEjT7ghSr23sO4arBOd5JiwkYNqVAlgv7OUPFytKOJpkibtGA7eJIztROxZbK0sTX9dE5GClLcNmarD7L1000T1byaYy',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });

    const paymentstripe = (stripeToken: any) => {
      this._http.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };

    paymentHandler.open({
      name: 'Prime Shopper',
      description: 'This is a sample Payment',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: '###yourkey###',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

}
