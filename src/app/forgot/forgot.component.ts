import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private mail:UserDataService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  forgot_password(mail_address:any)
  {
    localStorage.removeItem('forgot_password_id');
    console.warn(mail_address);
      this.mail.mail_password(mail_address).subscribe((result:any)=>{
        
        if(result.data == "Oops ! Email is Not Accessed ! Please Enter Valid Email")
        {
          this.toastr.error(result.data);
        }
        else
        {
          localStorage.setItem('forgot_password_id', result.data.id);
        }
      })
  }

}
