import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-saller-product',
  templateUrl: './saller-product.component.html',
  styleUrls: ['./saller-product.component.css']
})
export class SallerProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sallerBanner: OwlOptions = {
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
        touchDrag: true
      },
      740: {
        items: 1,
        touchDrag: true
      },
      940: {
        items: 1
      }
    }
    
  }

}
