import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment_preview_pageComponent } from './payment_preview_page.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [{ path: '', component: Payment_preview_pageComponent }];

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [Payment_preview_pageComponent]
})
export class Payment_preview_pageModule { }
