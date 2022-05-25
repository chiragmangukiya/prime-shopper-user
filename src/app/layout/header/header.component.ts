import  { SharedService } from '../../shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  clickEventSubscription: Subscription;
  totalProducts: number = 0;
  constructor(private router: Router, private _http: UserDataService, private sharedService: SharedService) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe((data) => {
      this.totalProducts = data;
    })
  }

  checkLogin: any;
  userProfile: any;
  cartData: any;
  totalPrice: any = 0;
  allCategories: any = [];

  ngOnInit(): void {
    if (localStorage.getItem('X-Authentication-token') != null) {
      this.checkLogin = true;
    }
    this._http.get_profile().subscribe((result: any) => {
      this.userProfile = result;
    });

    this._http.cart('').subscribe((result: any) => {
      // console.log(result.data.cartIds);
      if(result.data.cartIds.length){
        let count = 0;
        result.data.cartIds.map((el: any) => {
          count = count + el.quantity;
        })
        this.totalProducts = count
      } else {
        this.totalProducts = 0;
      }
    });

    this._http.allCategories('').subscribe((result: any) => {
      this.allCategories = result.data
    });

  }

  logout_user() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
