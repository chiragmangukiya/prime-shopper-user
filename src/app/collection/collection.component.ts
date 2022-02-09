import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor() { }

  ngOnInit(): void {
  }

}
