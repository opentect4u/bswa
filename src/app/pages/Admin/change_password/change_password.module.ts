import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Change_passwordComponent } from './change_password.component';
import { RouterModule, Routes } from '@angular/router';
// import { CardModule } from 'primeng/card';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
// import { FieldsetModule } from 'primeng/fieldset';
// import { TableModule } from 'primeng/table';
// import { TabMenuModule } from 'primeng/tabmenu';
// import { CalendarModule } from 'primeng/calendar';
// import { DropdownModule } from 'primeng/dropdown';
// import { StepsModule } from 'primeng/steps';
// import { DividerModule } from 'primeng/divider';
// import { BadgeModule } from 'primeng/badge';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { FileUploadModule } from 'primeng/fileupload';
// import { ReactiveFormsModule } from '@angular/forms';
// import { TooltipModule } from 'primeng/tooltip';
// import {Gen_img_uploadModule} from '../gen_img_upload/gen_img_upload.module'


import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const routes:Routes=[
  {path:'',component:Change_passwordComponent}
]

@NgModule({
  imports: [
    CommonModule,
    // CardModule,
    // InputTextModule,
    // ButtonModule,
    // DropdownModule,
    // FieldsetModule,
    // TableModule,
    // TabMenuModule,
    // CalendarModule,
    // StepsModule,
    // DividerModule,
    // BadgeModule,
    // InputTextareaModule,
    // FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ToastModule,
    // MessageService,
    // TooltipModule,
    // Gen_img_uploadModule,
    RouterModule.forChild(routes)
  ],
  // exports: [Change_passwordComponent],
  declarations: [Change_passwordComponent]
})
export class Change_passwordModule { }
