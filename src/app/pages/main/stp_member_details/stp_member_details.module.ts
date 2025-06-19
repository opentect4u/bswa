import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stp_member_detailsComponent } from './stp_member_details.component';
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
  {path:'',component:Stp_member_detailsComponent}
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
  declarations: [Stp_member_detailsComponent]
})
export class Stp_member_detailsModule { }
