import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders}  from '@angular/common/http';
import { Options } from '@angular-slider/ngx-slider';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  Register_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/register";
  login_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/login";
  forgot_password_url = "https://prime-shopper-api.herokuapp.com/api/v1/user/forgot/password";
  userProfile = "https://prime-shopper-api.herokuapp.com/api/v1/user/profile";
  profileupdate = "https://prime-shopper-api.herokuapp.com/api/v1/user/profile/update";
  getProduct = "https://prime-shopper-api.herokuapp.com/api/v1/products";


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

  update_profile(data:any)
  {
      let options : any = { headers: this._getHeaders() };
     return this.http.post(this.profileupdate,data,options)
  }

  get_product()
  {
    return this.http.post(this.getProduct,"");
  }

}
