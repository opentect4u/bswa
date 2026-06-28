import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryShippingPolicyComponent } from './delivery-shipping-policy.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DeliveryShippingPolicyComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeliveryShippingPolicyComponent]
})
export class DeliveryShippingPolicyModule { }
