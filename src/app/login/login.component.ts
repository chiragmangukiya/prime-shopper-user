import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginuser: UserDataService, private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('userLogin') != null) {
      this.router.navigate(['/']);
    }
  }

  userlogin: any;

  handleLogin(loginForm: any) {

    this.loginuser.login(loginForm).subscribe((result: any) => {
      if (result.data == "Email Not Exists!Please Check Your Email") {
        this.toastr.error(result.data);
      }
      else if (result.data == "Invalid Password! Please check your password.") {
        this.toastr.error(result.data);
      }
      else {
        this.toastr.success("Login Success..");
        localStorage.setItem('userLogin', result.data._id);
        localStorage.setItem('X-Authentication-token', result.data.token);
        this.router.navigate(['/']);
      }
    });

  }

}
