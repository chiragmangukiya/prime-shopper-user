import { NgModule} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './layout/default/default.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CollectionComponent } from './collection/collection.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductComponent } from './product/product.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { CartComponent } from './cart/cart.component';
import { ReturnRefundPolicyComponent } from './return-refund-policy/return-refund-policy.component';
import { FaqComponent } from './faq/faq.component';
import { StoresComponent } from './stores/stores.component';
import { StoresImgComponent } from './stores-img/stores-img.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxImgZoomModule  } from 'ngx-img-zoom';
import { SallerProductComponent } from './saller-product/saller-product.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    AboutUsComponent,
    CollectionComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    CartComponent,
    ReturnRefundPolicyComponent,
    FaqComponent,
    StoresComponent,
    StoresImgComponent,
    SallerProductComponent,
    SubCategoryComponent,
    ViewProfileComponent,
    EditProfileComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxSliderModule,
    NgxImageZoomModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxImgZoomModule,
    ToastrModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_51KsmT8SEjT7ghSr23sO4arBOd5JiwkYNqVAlgv7OUPFytKOJpkibtGA7eJIztROxZbK0sTX9dE5GClLcNmarD7L1000T1byaYy')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
