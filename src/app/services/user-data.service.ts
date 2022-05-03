import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders}  from '@angular/common/http';
import { Options } from '@angular-slider/ngx-slider';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  currentLiveUrl = "https://api.datavidhya.com"
  // currentLiveUrl = "http://localhost:5000"
  Register_url = `${this.currentLiveUrl}/api/v1/user/register`;
  login_url = `${this.currentLiveUrl}/api/v1/user/login`;
  forgot_password_url = `${this.currentLiveUrl}/api/v1/user/forgot/password`;
  userProfile = `${this.currentLiveUrl}/api/v1/user/profile`;
  profileupdate = `${this.currentLiveUrl}/api/v1/user/profile/update`;
  getProduct = `${this.currentLiveUrl}/api/v1/products`;
  getsproduct = `${this.currentLiveUrl}/api/v1/product`;
  getCart = `${this.currentLiveUrl}/api/v1/cart`;
  startPayment = `${this.currentLiveUrl}/api/v1/create-payment`;


  constructor(private http:HttpClient) {}

  product_id:any;

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

  product(data:any)
  {
    this.product_id = ({ 'product': (data ? data : 'unAuth') })
      return this.http.post(this.getsproduct,this.product_id);
  }

  cart(data:any)
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.getCart,'', options);
  }

  makePayment(stripeToken: any){
    // console.log(stripeToken);
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.startPayment, stripeToken, options);
  }

}
