import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stp_premium_paymentComponent } from './stp_premium_payment.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes:Routes=[
  {path:'',component:Stp_premium_paymentComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    DividerModule,
    InputTextModule,
    MatButtonModule,
    DropdownModule,
    DividerModule,
    InputTextareaModule,
    FileUploadModule,
    ReactiveFormsModule,
    ToastModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Stp_premium_paymentComponent]
})
export class Stp_premium_paymentModule { }
