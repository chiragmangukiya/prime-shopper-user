import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service' 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private _http:UserDataService) { }

  checkLogin:any;
  userProfile:any;

  ngOnInit(): void {
    if (localStorage.getItem('X-Authentication-token') != null) {
        this.checkLogin = true;
    }
    this._http.get_profile().subscribe((result:any)=>{
      this.userProfile = result;
    })
  }

  logout_user()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
