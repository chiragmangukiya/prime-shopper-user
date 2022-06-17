import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders}  from '@angular/common/http';
import { Options } from '@angular-slider/ngx-slider';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  currentLiveUrl = "https://api.admincliq.com"
  // currentLiveUrl = "http://localhost:5000"
  Register_url = `${this.currentLiveUrl}/api/v1/user/register`;
  login_url = `${this.currentLiveUrl}/api/v1/user/login`;
  forgot_password_url = `${this.currentLiveUrl}/api/v1/user/forgot/password`;
  userProfile = `${this.currentLiveUrl}/api/v1/user/profile`;
  profileupdate = `${this.currentLiveUrl}/api/v1/user/profile/update`;
  getProducts = `${this.currentLiveUrl}/api/v1/products`;
  getproduct = `${this.currentLiveUrl}/api/v1/product`;
  getCart = `${this.currentLiveUrl}/api/v1/cart`;
  updateCartUrl = `${this.currentLiveUrl}/api/v1/add/cart`;
  deleteCartItemUrl = `${this.currentLiveUrl}/api/v1/remove/cart`;
  startPayment = `${this.currentLiveUrl}/api/v1/create-payment`;
  getCategories = `${this.currentLiveUrl}/api/v1/categories`;
  getCategory = `${this.currentLiveUrl}/api/v1/category`;
  getAllHomeSliders = `${this.currentLiveUrl}/api/v1/homepagesliders`;
  getAllSubSliders = `${this.currentLiveUrl}/api/v1/subpagesliders`;
  addFavouriteUrl = `${this.currentLiveUrl}/api/v1/add/favorite`;
  allFaourites = `${this.currentLiveUrl}/api/v1/favorites`;


  constructor(private http:HttpClient) {}

  product_id:any;

  _getHeaders() {
    var token = this.getToken();
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
    return this.http.post(this.getProducts,"");
  }

  product(data:any)
  {
    this.product_id = ({ 'product': (data ? data : 'unAuth') })
      return this.http.post(this.getproduct,this.product_id);
  }

  cart(data:any)
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.getCart,'', options);
  }

  updateCart(data:any)
  {
    let options : any = { headers: this._getHeaders() };
      return this.http.post(this.updateCartUrl, data, options);
  }

  deleteCartItem(data:any)
  {
    let options : any = { headers: this._getHeaders() };
      return this.http.post(this.deleteCartItemUrl, data, options);
  }

  wishlist(data:any)
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.getCart,'', options);
  }

  updatewishlist(data:any)
  {
    let options : any = { headers: this._getHeaders() };
      return this.http.post(this.updateCartUrl, data, options);
  }

  deletewishlistItem(data:any)
  {
    let options : any = { headers: this._getHeaders() };
      return this.http.post(this.deleteCartItemUrl, data, options);
  }

  makePayment(stripeToken: any){
    // console.log(stripeToken);
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.startPayment, stripeToken, options);
  }

  allCategories(data:any)
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.getCategories,'', options);
  }

  addFavourite(data:any)
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.addFavouriteUrl, data, options);
  }

  getFavourites()
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.post(this.allFaourites, '', options);
  }

  allHomeSliders()
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.get(this.getAllHomeSliders);
  }

  allSubSliders()
  {
    let options : any = { headers: this._getHeaders() };
    return this.http.get(this.getAllSubSliders);
  }

}
