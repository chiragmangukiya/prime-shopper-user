import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100,
  };

  productData: any;

  constructor(private _http: UserDataService) {}

  ngOnInit(): void {
    this._http.get_product().subscribe((result: any) => {
      this.productData = result.data;
    });
  }

  productVariationPath(id: String, var1: any, var2: any) {
    console.log("check:: ", var1, var2);

    let setVar1 = var1 && var1.value ? var1.value : null;
    let setVar2 = var2 && var2.value ? var2.value : null;
    return '/product/' + id + '/' + setVar1 + '/' + setVar2;
  }
}
