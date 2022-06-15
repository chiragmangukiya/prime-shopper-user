import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _http: UserDataService) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
    autoWidth: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause:true,
    stagePadding:50,
    responsive: {
      0: {
        items: 1,
        nav: false,
        touchDrag: true
      },
      992: {
        items: 1
      }
    }

  }

  categorySliderOption: OwlOptions = {
    loop: true,
    margin:20,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
    autoWidth: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 3,
        nav:false,
        touchDrag: true
      },
      320: {
        items: 4,
        nav:false,
        touchDrag: true
      },
      576: {
        items: 7,
        nav:false,
        touchDrag: true
      },
      768: {
        items: 7,
        nav:false,
        touchDrag: true
      },
      1000: {
        items: 9,
        nav:true
      },
      1400: {
        items: 11,
        nav:true
      }

    },
    nav: true
  }

  best_offer: OwlOptions = {
    loop: true,
    margin:15,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 1000,
    navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
    autoplay: true,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 2,
        center:true,
        nav:false,
        touchDrag: true
      },
      576: {
        items: 3,
        nav:false,
        touchDrag: true
      },
      768: {
        items: 4,
        nav:false,
        touchDrag: true
      },
      1000: {
        items: 5
      },
      1366: {
        items: 6
      }

    }

  }

  top_brands: OwlOptions = {
    loop: true,
    margin:15,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 1000,
    navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
    autoWidth: true,
    autoplay: true,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 2,
        nav:false,
        touchDrag: true
      },
      576: {
        items: 3,
        nav:false,
        touchDrag: true
      },
      768: {
        items: 4,
        nav:false,
        touchDrag: true
      },
      1000: {
        items: 5
      },
      1366: {
        items: 5
      }

    }

  }

  top_brands_banner: OwlOptions = {
    loop: true,
    margin:15,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 1000,
    navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
    autoWidth: true,
    autoplay: true,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1,
        nav:false,
        touchDrag: true
      },
      576:{
        items: 2,
        nav:false,
        touchDrag: true
      },
      768: {
        items: 2,
        nav:false,
        touchDrag: true
      },
      1000: {
        items: 3
      }

    }

  }

  flashProducts: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  

  allCategories: any = [];

  welcomeOffersData: any = [];
  bigOfferSliderData: any = [];
  topSelectedBrandSliderData: any = [];
  bestSellerSliderData: any = [];
  bestSellingProductSliderData: any = [];
  newArrivalSliderData: any = [];

  ngOnInit(): void {
    this._http.allCategories('').subscribe((result: any) => {
      this.allCategories = result.data
    });

    this._http.allHomeSliders().subscribe((result: any) => {
      let alldata = result.data

      if(alldata.welcomeOffersData && alldata.welcomeOffersData.length){
        this.welcomeOffersData = alldata.welcomeOffersData;
      }

      if(alldata.bigOfferSliderData && alldata.bigOfferSliderData.length){
        this.bigOfferSliderData = alldata.bigOfferSliderData;
      }

      if(alldata.topSelectedBrandSliderData && alldata.topSelectedBrandSliderData.length){
        this.topSelectedBrandSliderData = alldata.topSelectedBrandSliderData;
      }

      if(alldata.bestSellerSliderData && alldata.bestSellerSliderData.length){
        this.bestSellerSliderData = alldata.bestSellerSliderData;
      }

      if(alldata.bestSellingProductSliderData && alldata.bestSellingProductSliderData.length){
        this.bestSellingProductSliderData = alldata.bestSellingProductSliderData;
      }

      if(alldata.newArrivalSliderData && alldata.newArrivalSliderData.length){
        this.newArrivalSliderData = alldata.newArrivalSliderData;
      }
    });
  }

}
