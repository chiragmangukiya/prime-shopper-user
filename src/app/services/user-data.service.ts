import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  Register_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/register";
  login_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/login";
  forgot_password_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/forgot/password";

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
      return this.http.post(this.forgot_password_url,email)
  }

}
