import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CollectionComponent } from './collection/collection.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FaqComponent } from './faq/faq.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HomeComponent } from './home/home.component';
import { DefaultComponent } from './layout/default/default.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { ReturnRefundPolicyComponent } from './return-refund-policy/return-refund-policy.component';
import { SallerProductComponent } from './saller-product/saller-product.component';
import { StoresImgComponent } from './stores-img/stores-img.component';
import { StoresComponent } from './stores/stores.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [

  {
    path : '',
    redirectTo : '/',
    pathMatch : 'full',
  },

  {
    path : '',
    component : DefaultComponent,
    children : [

      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'contact-us',
        component : ContactUsComponent
      },
      {
        path : 'about-us',
        component : AboutUsComponent
      },
      {
        path : 'collections/:cat/:subcat',
        component : CollectionComponent
      },
      {
        path : 'product/:p_id/:var1/:var2',
        component : ProductComponent
      },
      {
        path : 'cart',
        component : CartComponent
      },
      {
        path : 'wishlist',
        component : WishlistComponent
      },
      {
        path : 'faq',
        component : FaqComponent
      },
      {
        path : 'stores',
        component : StoresComponent
      },
      {
        path : 'stores-img',
        component : StoresImgComponent
      },
      {
        path : 'return-refund-policy',
        component : ReturnRefundPolicyComponent
      },
      {
        path : 'seller',
        component : SallerProductComponent
      },
      {
        path : 'sub-category/:id',
        component : SubCategoryComponent
      },
      {
        path : 'view-profile',
        component : ViewProfileComponent
      },
      {
        path : 'edit-profile',
        component : EditProfileComponent
      },
      {
        path : 'checkout',
        component : CheckoutComponent
      },
      {
        path : 'view-order',
        component : ViewOrderComponent
      }
    ]
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'forgot',
    component : ForgotComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
