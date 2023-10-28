import { NgModule, Component } from '@angular/core';
import { CheckoutComponent } from './checkout.component';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
