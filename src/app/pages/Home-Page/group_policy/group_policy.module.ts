import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group_policyComponent } from './group_policy.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
// import {Gen_img_uploadModule} from '../../Admin/gen_img_upload/gen_img_upload.module'
const routes:Routes=[
  {path:'',component:Group_policyComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FieldsetModule,
    TableModule,
    TabMenuModule,
    CalendarModule,
    StepsModule,
    DividerModule,
    BadgeModule,
    InputTextareaModule,
    FileUploadModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ToastModule,
    DialogModule,
    // FormsModule,
    // Gen_img_uploadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Group_policyComponent]
})
export class Group_policyModule { }
