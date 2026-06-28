import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundCancellationPolicyComponent } from './refund-cancellation-policy.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RefundCancellationPolicyComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RefundCancellationPolicyComponent]
})
export class RefundCancellationPolicyModule { }
