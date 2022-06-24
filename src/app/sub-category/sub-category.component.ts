import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
})
export class SubCategoryComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _http: UserDataService) {}

  allCategories: any = [];
  currentCategory: any = {};
  newArrivalOffersData: any = [];
  bestSeller1Data: any = [];
  bestSeller2Data: any = [];
  childSubChat1Data: any = [];
  childSubChat2Data: any = [];
  categoryId: any = '';
  totalBrands: any = [];
  totalSellers: any = [];

  ngOnInit(): void {
    let subId = this.route.snapshot.paramMap.get('id');

    if(subId){
      this.categoryId = subId;
    }

    this._http.allCategories('').subscribe((result: any) => {
      this.allCategories = result.data;

      if (result.data && result.data.length) {
        let currentCat = result.data.find((el: any) => el._id == subId);
        if (currentCat) {
          this.currentCategory = currentCat;
          console.log("currentCat::", currentCat);


          currentCat.children.map((el: any) => {
            if (el && el.children && el.children.length) {
              el.children.map((child: any) => {
                if (this.childSubChat1Data.length < 15) {
                  this.childSubChat1Data.push(child);
                }

                if (
                  this.childSubChat1Data.length >= 15 &&
                  this.childSubChat2Data.length < 15
                ) {
                  this.childSubChat2Data.push(child);
                }
              });
            }
          });
        } else {
          alert('No category found');
        }
      }
    });

    this._http.allSubSliders().subscribe((result: any) => {
      let alldata = result.data;

      if (alldata.newArrivalOffersData && alldata.newArrivalOffersData.length) {
        this.newArrivalOffersData = alldata.newArrivalOffersData;
      }
      if (alldata.bestSeller1Data && alldata.bestSeller1Data.length) {
        this.bestSeller1Data = alldata.bestSeller1Data;
      }
      if (alldata.bestSeller2Data && alldata.bestSeller2Data.length) {
        this.bestSeller2Data = alldata.bestSeller2Data;
      }
    });

    this._http.get_product({}).subscribe((result: any) => {
      let allProducts = result.data;
      console.log(allProducts);

      if (allProducts && allProducts.length) {
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
      }
    });
  }

  subCategorySlider: OwlOptions = {
    loop: true,
    margin: 20,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<img src="/assets/images/left-arrow.png">',
      '<img src="/assets/images/right-arrow.png">',
    ],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
        nav: false,
        touchDrag: true,
      },
      375: {
        items: 3,
        nav: false,
        touchDrag: true,
      },
      576: {
        items: 6,
        nav: false,
        touchDrag: true,
      },
      768: {
        items: 7,
        nav: false,
        touchDrag: true,
      },
      1000: {
        items: 8,
      },
    },
    nav: true,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<img src="/assets/images/left-arrow.png">',
      '<img src="/assets/images/right-arrow.png">',
    ],
    autoWidth: true,
    nav: true,
    autoplay: true,
    // autoplayTimeout: 3000,
    autoplayHoverPause: true,
    stagePadding: 50,
    responsive: {
      0: {
        items: 1,
        nav: false,
        touchDrag: true,
      },
      425: {
        items: 1,
        nav: false,
        touchDrag: true,
      },
      740: {
        items: 1,
        nav: false,
        touchDrag: true,
      },
      940: {
        items: 1,
      },
    },
  };

  top_brands_banner: OwlOptions = {
    loop: true,
    margin: 15,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 1000,
    navText: [
      '<img src="/assets/images/left-arrow.png">',
      '<img src="/assets/images/right-arrow.png">',
    ],
    autoWidth: true,
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        touchDrag: true,
      },
      576: {
        items: 2,
        nav: false,
        touchDrag: true,
      },
      768: {
        items: 2,
        nav: false,
        touchDrag: true,
      },
      1000: {
        items: 2,
      },
    },
  };

  subCategorySmall: OwlOptions = {
    loop: true,
    margin: 20,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<img src="/assets/images/left-arrow.png">',
      '<img src="/assets/images/right-arrow.png">',
    ],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
        nav: false,
        touchDrag: true,
      },
      375: {
        items: 3,
        nav: false,
        touchDrag: true,
      },
      576: {
        items: 6,
        nav: false,
        touchDrag: true,
      },
      768: {
        items: 7,
        nav: false,
        touchDrag: true,
      },
      1000: {
        items: 6,
      },
    },
    nav: true,
  };

  collectionVariationPath(category: any, subcategory: any) {
    if(category && subcategory){
      return '../../collections/' +  category + '/' + subcategory;
    } else if(category){
      return '../../collections/' +  category + "/0";
    } else if(subcategory){
      return '../../collections/0/' + subcategory;
    } else {
      return '../../collections/0/0'
    }
  }

  collectionQueryVariationPath(category: any, subcategory: any, key:any, value: any) {
    if(category && subcategory){
      return '../../collections/' +  category + '/' + subcategory+"?"+key+"="+value;
    } else if(category){
      return '../../collections/' +  category + "/0"+"?"+key+"="+value;
    } else if(subcategory){
      return '../../collections/0/' + subcategory+"?"+key+"="+value;
    } else {
      return '../../collections/0/0'+"?"+key+"="+value
    }
  }
}
