import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  
  constructor(private http: UserDataService) { }
  userProfile: any;
  ngOnInit(): void {
    this.http.get_profile().subscribe((result:any)=>{
      this.userProfile = result;
      console.log(result)
    })

  }

}
