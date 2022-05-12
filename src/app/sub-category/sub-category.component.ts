import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  subCategorySlider: OwlOptions = {
    loop: true,
    margin:20,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 2,
        nav:false,
        touchDrag: true
      },
      375: {
        items: 3,
        nav:false,
        touchDrag: true
      },
      576: {
        items: 6,
        nav:false,
        touchDrag: true
      },
      768: {
        items: 7,
        nav:false,
        touchDrag: true
      },
      1000: {
        items: 8
      }

    },
    nav: true
  }

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
    // autoplayTimeout: 3000,
    autoplayHoverPause:true,
    stagePadding:50,
    responsive: {
      0: {
        items: 1,
        nav: false,
        touchDrag: true
      },
      425: {
        items: 1,
        nav: false,
        touchDrag: true
      },
      740: {
        items: 1,
        nav: false,
        touchDrag: true
      },
      940: {
        items: 1
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
        items: 2
      }

    }
    
  }

  subCategorySmall: OwlOptions = {
    loop: true,
    margin:20,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 2,
        nav:false,
        touchDrag: true
      },
      375: {
        items: 3,
        nav:false,
        touchDrag: true
      },
      576: {
        items: 6,
        nav:false,
        touchDrag: true
      },
      768: {
        items: 7,
        nav:false,
        touchDrag: true
      },
      1000: {
        items: 6
      }

    },
    nav: true
  }


}
