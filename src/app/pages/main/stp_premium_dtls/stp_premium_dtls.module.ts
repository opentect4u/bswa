import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stp_premium_dtlsComponent } from './stp_premium_dtls.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
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
  {path:'',component:Stp_premium_dtlsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
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
  declarations: [Stp_premium_dtlsComponent]
})
export class Stp_premium_dtlsModule { }
