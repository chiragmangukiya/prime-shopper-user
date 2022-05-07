import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _http: UserDataService,
    private toastr: ToastrService
  ) {}
  cartData: any;
  totalPrice: any = 0;

  ngOnInit(): void {
    this._http.cart('').subscribe((result: any) => {
      let allVariationdata = result.data.cart;
      let cartIdsdata = result.data.cartIds;
      // console.log(allVariationdata, cartIdsdata);
      let copyData = [...allVariationdata];
      copyData.map((el: any, index: number) => {
        el.product.variations
        el.product.variations = el.product.variations.find((obj: any) => {
          return obj._id == cartIdsdata[index].variations
        })
      })

      this.cartData = copyData;
      this.totalPrice = 0;
      this.cartData.map((el: any) => {
        this.totalPrice = this.totalPrice + el.quantity * el.product.variations.price.price_in_india;
      });
    });
  }

  updateCart(product: string, variations: string, quantity: number) {
    let updateProductData = {
      product,
      variations,
      quantity,
    };
    this._http.updateCart(updateProductData).subscribe(
      (result: any) => {
        this._http.cart('').subscribe((result: any) => {
          let allVariationdata = result.data.cart;
          let cartIdsdata = result.data.cartIds;
          // console.log(allVariationdata, cartIdsdata);
          let copyData = [...allVariationdata];
          copyData.map((el: any, index: number) => {
            el.product.variations
            el.product.variations = el.product.variations.find((obj: any) => {
              return obj._id == cartIdsdata[index].variations
            })
          })

          console.log(copyData);

          this.cartData = copyData;
          this.totalPrice = 0;
          this.cartData.map((el: any) => {
            this.totalPrice =
              this.totalPrice +
              el.quantity * el.product.variations.price.price_in_india;
          });
          // console.log(this.totalPrice);
        });
        this.toastr.success('Cart Update Successfull');
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  deleteCartItem(productId: string) {
    this._http.deleteCartItem({productId}).subscribe(
      (result: any) => {
        this._http.cart('').subscribe((result: any) => {
          let allVariationdata = result.data.cart;
          let cartIdsdata = result.data.cartIds;
          // console.log(allVariationdata, cartIdsdata);
          let copyData = [...allVariationdata];
          copyData.map((el: any, index: number) => {
            el.product.variations
            el.product.variations = el.product.variations.find((obj: any) => {
              return obj._id == cartIdsdata[index].variations
            })
          })

          console.log(copyData);

          this.cartData = copyData;
          this.totalPrice = 0;
          this.cartData.map((el: any) => {
            this.totalPrice =
              this.totalPrice +
              el.quantity * el.product.variations.price.price_in_india;
          });
          // console.log(this.totalPrice);
        });
        this.toastr.success('Delete Item Successfull');
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}
