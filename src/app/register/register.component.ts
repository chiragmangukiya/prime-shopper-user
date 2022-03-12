import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private http: UserDataService,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void { }

  toster:any;

  register(data: any) {
    
    this.http.register(data).subscribe((result:any) => {
      if(result.data!= false)
      {
        this.toastr.success("success");
        this.router.navigate(['/login']);
      }
      else
      {
        this.toastr.error("Your Email Address is already register");
      }
    
    })
  }
}
