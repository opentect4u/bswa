import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stp_premium_dtlsComponent } from './stp_premium_dtls.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

const routes:Routes=[
  {path:'',component:Stp_premium_dtlsComponent}
]

@NgModule({
  imports: [
    CommonModule,
            CardModule,
            TableModule,
            DividerModule,
            InputTextModule,
            ButtonModule,
            DropdownModule,
            DividerModule,
            InputTextareaModule,
            FileUploadModule,
            ReactiveFormsModule,
            ToastModule,
            RouterModule.forChild(routes)
  ],
  declarations: [Stp_premium_dtlsComponent]
})
export class Stp_premium_dtlsModule { }
