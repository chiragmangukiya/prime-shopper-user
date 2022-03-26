import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private http: UserDataService) { }
  userProfile: any;
  ngOnInit(): void {
    this.http.get_profile().subscribe((result: any) => {
      this.userProfile = result
      console.warn(result)
    })
  }

  updateuser(data: any) {

    this.http.update_profile(data).subscribe((result:any)=>{
      
    })

  }
}
