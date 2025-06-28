import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stp_member_detailsComponent } from './stp_member_details.component';
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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
            MatButtonModule,
            DropdownModule,
            DividerModule,
            InputTextareaModule,
            FileUploadModule,
            ReactiveFormsModule,
            ToastModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatDatepickerModule,
            MatIconModule,
            MatNativeDateModule,
            FormsModule,
            MatSlideToggleModule,
            RouterModule.forChild(routes)
  ],
  declarations: [Stp_member_detailsComponent]
})
export class Stp_member_detailsModule { }
