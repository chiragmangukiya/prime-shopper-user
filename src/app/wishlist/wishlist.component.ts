import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from '../services/user-data.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _http: UserDataService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}
  wishlistData: any;
  totalPrice: any = 0;
  favouritesData: any = []

  getAllFavourites(){
    this._http.getFavourites().subscribe((result: any) => {
      if (result.data && result.data.length) {
        let allFavouritesData = result.data;
        let copyData = [...allFavouritesData];
        copyData.map((el: any) => {
          el.product.variations;
          el.product.variations = el.product.variations.find((obj: any) => {
            return obj._id == el.variation;
          });
        });
        console.log("copyData", copyData);

        this.favouritesData = copyData;
      }
    });
  }

  ngOnInit(): void {
    this.getAllFavourites()
  }

  addToWishList(id: any, varId: any) {
    let favObj = {product: id, variations: varId}

    this._http.addFavourite(favObj).subscribe((result: any) => {
      this.getAllFavourites()
    });
  }
}
