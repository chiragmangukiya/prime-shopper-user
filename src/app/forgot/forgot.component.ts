import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private mail:UserDataService) { }

  ngOnInit(): void {
  }

  forgot_password(mail_address:any)
  {
      this.mail.mail_password(mail_address).subscribe((result:any)=>{
        console.warn(result)
      })
  }

}
