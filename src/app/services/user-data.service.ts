import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders}  from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  Register_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/register";
  login_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/login";
  forgot_password_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/forgot/password";
  userProfile = "https://prime-shopper-api.herokuapp.com/api/v1/user/profile";

  constructor(private http:HttpClient) {}

  _getHeaders() {
    var token = this.getToken();
    console.log("token", token);
    
    return new HttpHeaders({ 'X-Authentication-token': (token ? token : 'unAuth') })
  }

  getToken() {
    return localStorage.getItem('X-Authentication-token');
  }

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

  get_profile()
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.userProfile,'',options);
  }

}
