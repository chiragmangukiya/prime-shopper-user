import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  Register_url = "https://prime-shopper.herokuapp.com/api/v1/user/register";
  login_url = "https://prime-shopper.herokuapp.com/api/v1/user/login";
  mail_url = "https://mailsendapi1.herokuapp.com/";

  constructor(private http:HttpClient) {}

  register(data:any)
  {
    return this.http.post(this.Register_url,data);
  }

  login(data:any)
  {
    return this.http.post(this.login_url,data);
  }

  mail_password(email:any)
  {
      return this.http.post(this.mail_url,email)
  }

}
