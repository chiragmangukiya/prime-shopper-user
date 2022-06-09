import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

function _window(): any {
  return window;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  get nativeWindow(): any {
    return _window();
  }

  constructor(private route: ActivatedRoute, private _http: UserDataService) {}
  cartData: any;
  totalPrice: any = 0;
  subTotal: any = 0;

  paymentHandler: any = null;

  success: boolean = false;

  failure: boolean = false;

  allFormData: any = false;

  ngOnInit(): void {
    this._http.cart('').subscribe((result: any) => {
      let allVariationdata = result.data.cart;
      let cartIdsdata = result.data.cartIds;
      let copyData = [...allVariationdata];
      copyData.map((el: any, index: number) => {
        el.product.variations;
        el.product.variations = el.product.variations.find((obj: any) => {
          return obj._id == cartIdsdata[index].variations;
        });
      });

      this.cartData = copyData;
      localStorage.setItem('cartData', JSON.stringify(copyData));
      this.totalPrice = 0;
      this.cartData.map((el: any) => {
        this.totalPrice =
          this.totalPrice +
          el.quantity * el.product.variations.price.price_in_india;
      });
    });

    this.invokeStripe();
  }

  rzp1: any;

  // makePayment(paymentToken: any) {
  //   let paymentObject = {
  //     checkoutdata: this.allFormData,
  //     paymentData: paymentToken,
  //   };

  //   this._http.makePayment(paymentObject).subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }

  pay(checkoutForm: any) {
    let setFormData: any = {};
    let billingAddress: any = {
      address_city: checkoutForm.address_city ? checkoutForm.address_city : '',
      address_country: checkoutForm.address_country
        ? checkoutForm.address_country
        : '',
      address_line1: checkoutForm.address_line1
        ? checkoutForm.address_line1
        : '',
      address_line2: checkoutForm.address_line2
        ? checkoutForm.address_line2
        : '',
      address_state: checkoutForm.address_state
        ? checkoutForm.address_state
        : '',
      address_zip: checkoutForm.address_zip ? checkoutForm.address_zip : '',
    };

    setFormData['billingAddress'] = billingAddress;
    setFormData['totalPrice'] = this.totalPrice * 100;
    setFormData['first_name'] = checkoutForm.first_name
      ? checkoutForm.first_name
      : '';
    setFormData['last_name'] = checkoutForm.last_name
      ? checkoutForm.last_name
      : '';
    setFormData['shipping_contact'] = checkoutForm.shipping_contact
      ? checkoutForm.shipping_contact
      : '';
    setFormData['contact_number'] = checkoutForm.contact_number
      ? checkoutForm.contact_number
      : '';
    setFormData['contact_email'] = checkoutForm.contact_email
      ? checkoutForm.contact_email
      : '';
    setFormData['cartData'] = this.cartData;

    this.allFormData = setFormData;

    const paymentReq = (paymentToken: any) => {
      let paymentData = {
        token: paymentToken,
        total: this.totalPrice,
        sellingTotal: this.subTotal,
      };

      let paymentObject = {
        checkoutdata: this.allFormData,
        paymentData: paymentData,
      };

      this._http.makePayment(paymentObject).subscribe((data: any) => {
        console.log(data);
      });
    };

    let options: any = {
      key: 'rzp_test_weS4smSu2KR8w3', // Enter the Key ID generated from the Dashboard
      amount: this.totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: setFormData['first_name'] + ' ' + setFormData['last_name'],
      description: 'Test Transaction',
      order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: any) {
        paymentReq(response.razorpay_payment_id);
      },
      prefill: {
        name: setFormData['first_name'] + ' ' + setFormData['last_name'],
        email: setFormData['contact_email'],
        contact: setFormData['contact_number'],
      },
      notes: {
        address: checkoutForm.address_line1,
      },
      theme: {
        color: '#3399cc',
      },
    };

    this.rzp1 = new this.nativeWindow.Razorpay(options);
    this.rzp1.open();
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KsmT8SEjT7ghSr23sO4arBOd5JiwkYNqVAlgv7OUPFytKOJpkibtGA7eJIztROxZbK0sTX9dE5GClLcNmarD7L1000T1byaYy',
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
