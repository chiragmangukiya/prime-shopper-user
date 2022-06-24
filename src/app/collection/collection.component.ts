import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { UserDataService } from '../services/user-data.service';
import { ActivatedRoute } from '@angular/router';

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
  totalSellers: any = [];

  // filters
  productData: any = [];
  categoryId: string = '';
  subCategoryId: string = '';
  minPriceValue: any = 0;
  maxPriceValue: any = 0;
  filterBrands: any = [];
  filterSellers: any = [];
  discount: any = 0;
  arrivalTime: any = 0;

  constructor(private route: ActivatedRoute, private _http: UserDataService) {}

  getAllProducts() {
    let filterObj = {
      categoryId: this.categoryId,
      subCategoryId: this.subCategoryId,
      minPriceValue: this.minPriceValue,
      maxPriceValue: this.maxPriceValue,
      filterBrands: this.filterBrands,
      filterSellers: this.filterSellers,
      discount: this.discount,
      arrivalTime: this.arrivalTime,
    };

    this._http.get_product(filterObj).subscribe((result: any) => {
      let allProducts = result.data;
      console.log(allProducts);

      if (allProducts && allProducts.length) {
        this.productData = allProducts.slice();
        this.allProductData = allProducts.slice();

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
          if (el.brand_name && !this.totalBrands.includes(el.brand_name)) {
            this.totalBrands.push(el.brand_name);
          }
          if (
            el.seller &&
            el.seller.name &&
            !this.totalSellers.includes(el.seller.name)
          ) {
            this.totalSellers.push(el.seller.name);
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
    let catId = this.route.snapshot.paramMap.get('cat');
    let subcatId = this.route.snapshot.paramMap.get('subcat');
    this.categoryId = catId ? catId : '';
    this.subCategoryId = subcatId ? subcatId : '';

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
    let filterObj = {
      categoryId: this.categoryId,
      subCategoryId: this.subCategoryId,
      filterBrands: this.filterBrands,
      filterSellers: this.filterSellers,
      arrivalTime: this.arrivalTime,
    };
    this._http.get_product(filterObj).subscribe((result: any) => {
      if (result.data && result.data.length) {
        let filterData = [...result.data];
        filterData.forEach((el: any) => {
          if (el && el.variations && el.variations.length) {
            el.variations = [...el.variations].filter((item: any) => {
              if (
                item.sellingPrice &&
                item.sellingPrice.selling_price_in_india
              ) {
                return (
                  item.sellingPrice.selling_price_in_india >=
                    this.minPriceValue &&
                  item.sellingPrice.selling_price_in_india <= this.maxPriceValue
                );
              } else {
                return false;
              }
            });
          }
        });
        if (filterData && filterData.length) {
          this.productData = filterData;
          let totalLength = 0;
          filterData.map((el: any) => {
            if (el && el.variations && el.variations.length) {
              totalLength = totalLength + el.variations.length;
            }
          });
          this.totalProductsLength = totalLength;
        } else {
          this.productData = [];
          this.totalProductsLength = 0;
        }
      } else {
        this.productData = [];
        this.totalProductsLength = 0;
      }
    });
  }

  priceRangeChange(event: any) {
    this.minPriceValue = event.value;
    this.maxPriceValue = event.highValue;
    this.filterProducts();
  }

  onBrandCheckboxChange(event: any, value: any) {
    if (event.target.checked) {
      this.filterBrands.push(value);
    } else {
      const index = this.filterBrands.indexOf(value);
      if (index > -1) {
        this.filterBrands.splice(index, 1);
      }
    }
    this.getAllProducts();
  }

  onsellerCheckboxChange(event: any, value: any) {
    if (event.target.checked) {
      this.filterSellers.push(value);
    } else {
      const index = this.filterSellers.indexOf(value);
      if (index > -1) {
        this.filterSellers.splice(index, 1);
      }
    }
    this.getAllProducts();
  }

  onDiscountRadioChange(event: any, value: any) {
    this.discount = value;
    this.filterProducts();
  }

  onNewArrivalRadioChange(event: any, value: any) {
    this.arrivalTime = value;
    this.getAllProducts();
  }

  roundFigure(value: number) {
    return Math.round(value);
  }
}
