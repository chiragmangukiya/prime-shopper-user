import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { NgxImgZoomService } from 'ngx-img-zoom';
// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _http: UserDataService,
    private ngxImgZoom: NgxImgZoomService
  ) {
    this.ngxImgZoom.setZoomBreakPoints([
      { w: 50, h: 50 },
      { w: 100, h: 100 },
      { w: 150, h: 150 },
      { w: 200, h: 200 },
      { w: 250, h: 250 },
      { w: 300, h: 300 },
    ]);
  }

  productData: any;
  currentProduct: any;
  totalimage: any;
  var1val: any;
  var2val: any;
  // enableZoom: Boolean = true;
  previewImageSrc: any;
  zoomImageSrc: any;

  ngOnInit(): void {
    var product = this.route.snapshot.paramMap.get('p_id');
    var var1 = this.route.snapshot.paramMap.get('var1');
    this.var1val = var1 && var1 != 'null' ? var1 : null;
    var var2 = this.route.snapshot.paramMap.get('var2');
    this.var2val = var2 && var2 != 'null' ? var2 : null;

    this._http.product(product).subscribe((result: any) => {
      this.productData = result.data;

      if (this.productData && this.productData.variations.length) {
        let checkItem;

        if (this.var1val && this.var2val) {
          checkItem = this.productData.variations.find((el: any, i: number) => {
            return (
              this.var1val == el.variation1.value &&
              this.var2val == el.variation2.value
            );
          });
        } else if (this.var1val) {
          checkItem = this.productData.variations.find((el: any, i: number) => {
            return this.var1val == el.variation1.value;
          });
        } else if (this.var2val) {
          checkItem = this.productData.variations.find((el: any, i: number) => {
            return this.var2val == el.variation2.value;
          });
        }
        console.log('current variation::', checkItem);
        this.currentProduct = checkItem;
        if (checkItem.images.length) {
          this.previewImageSrc = checkItem.images[0];
          this.zoomImageSrc = checkItem.images[0];
        } else {
          this.previewImageSrc = checkItem.banner;
          this.zoomImageSrc = checkItem.banner;
        }
      }
    });
  }

  getidvalue() {}

  counter(i: number) {
    if (i < 5) {
      return new Array(i);
    } else {
      return new Array(5);
    }
  }

  imageZoom(imgID: any, resultID: any) {
    var img: any, lens: any, result: any, cx: any, cy: any;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.createElement('DIV');
    lens.setAttribute('class', 'img-zoom-lens');
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize =
      img.width * cx + 'px ' + img.height * cy + 'px';
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
    /*and also for touch screens:*/
    lens.addEventListener('touchmove', moveLens);
    img.addEventListener('touchmove', moveLens);
    function moveLens(e: any) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - lens.offsetWidth / 2;
      y = pos.y - lens.offsetHeight / 2;
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      /*set the position of the lens:*/
      lens.style.left = x + 'px';
      lens.style.top = y + 'px';
      /*display what the lens "sees":*/
      result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
    }
    function getCursorPos(e: any) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
  //   autoWidth: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 1
  //     }
  //   },
  //   nav: true
  // }

  // categorySliderOption: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
  //   autoWidth: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 10
  //     }
  //   },
  //   nav: true
  // }

  // flashProducts: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: [ '<img src="/assets/images/left-arrow.png">', '<img src="/assets/images/right-arrow.png">' ],
  //   autoWidth: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 6
  //     }
  //   },
  //   nav: true
  // }

  // Product Zoom

  toggleModal(id: string, var1: string, var2: string) {
    // console.log("Hello");
    if (this.var1val != var1 || this.var2val != var2) {
      this.var1val = var1 ? var1 : null;
      this.var2val = var2 ? var2 : null;
      this._http.product(id).subscribe((result: any) => {
        this.productData = result.data;

        if (this.productData && this.productData.variations.length) {
          let checkItem;
          if (var1 && var2) {
            checkItem = this.productData.variations.find(
              (el: any, i: number) => {
                return (
                  var1 == el.variation1.value && var2 == el.variation2.value
                );
              }
            );
          } else if (var1) {
            checkItem = this.productData.variations.find(
              (el: any, i: number) => {
                return var1 == el.variation1.value;
              }
            );
          } else if (var2) {
            checkItem = this.productData.variations.find(
              (el: any, i: number) => {
                return var2 == el.variation2.value;
              }
            );
          }
          console.log('current variation::', checkItem);
          this.currentProduct = checkItem;
        }
      });
    }
  }

  setImageActive(image: any) {
    this.previewImageSrc = image;
    this.zoomImageSrc = image;
  }
}
