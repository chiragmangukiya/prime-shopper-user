import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  value: number = 0;
  highValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100,
  };

  allProductData: any = [];
  totalProductsLength: any = 0;
  totalBrands: any = [];

  // filters
  productData: any = [];
  minPriceValue: any = 0;
  maxPriceValue: any = 0;
  filterBrands: any = [];

  constructor(private _http: UserDataService) {}

  getAllProducts() {
    this._http.get_product().subscribe((result: any) => {
      let allProducts = result.data;
      console.log("allProducts", allProducts);

      if (allProducts && allProducts.length) {
        this.productData = allProducts;
        this.allProductData = allProducts;

        let totalLength = 0;
        let maxRange = 0;

        allProducts.map((el: any) => {
          if (el && el.variations && el.variations.length) {
            totalLength = totalLength + el.variations.length;
            el.variations.map((item: any) => {
              if (item.price && item.price.price_in_india) {
                if (maxRange < item.price.price_in_india) {
                  maxRange = item.price.price_in_india;
                }
              }
            });
          }
          if(el.brand_name && !this.totalBrands.includes(el.brand_name)){
            this.totalBrands.push(el.brand_name)
          }
        });
        this.totalProductsLength = totalLength;
        this.highValue = maxRange;
        this.options = {
          floor: 0,
          ceil: maxRange,
        };
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  productVariationPath(id: String, var1: any, var2: any) {
    let setVar1 = var1 && var1.value ? var1.value : null;
    let setVar2 = var2 && var2.value ? var2.value : null;
    return '/product/' + id + '/' + setVar1 + '/' + setVar2;
  }

  addToWishList(id: any, varId: any) {
    let favObj = { product: id, variations: varId };

    this._http.addFavourite(favObj).subscribe((result: any) => {
      this.getAllProducts();
    });
  }

  filterProducts() {
    let filterData = this.allProductData.filter((el: any) => {
      let checkFilter = false;
      if (el && el.variations && el.variations.length) {
        el.variations.map((item: any) => {
          if (item.price && item.price.price_in_india) {
            return (checkFilter =
              item.price.price_in_india >= this.minPriceValue &&
              item.price.price_in_india <= this.maxPriceValue);
          }
          return (checkFilter = false);
        });
      }

      return checkFilter;
    });

    this.productData = filterData;
    let totalLength = 0;
    filterData.map((el: any) => {
      if (el && el.variations && el.variations.length) {
        totalLength = totalLength + el.variations.length;
      }
    });
    this.totalProductsLength = totalLength;
  }

  priceRangeChange(event: any) {
    this.minPriceValue = event.value;
    this.maxPriceValue = event.highValue;

    this.filterProducts();
  }
}
