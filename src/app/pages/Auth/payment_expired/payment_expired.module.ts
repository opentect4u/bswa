import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment_expiredComponent } from './payment_expired.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: Payment_expiredComponent }];

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  declarations: [Payment_expiredComponent]
})
export class Payment_expiredModule { }
