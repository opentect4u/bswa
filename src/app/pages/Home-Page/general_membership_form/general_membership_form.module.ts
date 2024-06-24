import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { General_membership_formComponent } from './general_membership_form.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import {Spouse_infoModule} from '../../Admin/spouse_info/spouse_info.module'
import {Gen_dep_formModule} from '../../Admin/gen_dep_form/gen_dep_form.module'
import {Gen_img_uploadModule} from '../../Admin/gen_img_upload/gen_img_upload.module'
import {Gen_fee_formModule} from '../../Admin/gen_fee_form/gen_fee_form.module'
const routes:Routes=[
  {path:'',component:General_membership_formComponent}
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
    DialogModule,
    Spouse_infoModule,
    Gen_dep_formModule,
    Gen_img_uploadModule,
    Gen_fee_formModule,

    RouterModule.forChild(routes)
  ],
  declarations: [General_membership_formComponent]
})
export class General_membership_formModule { }
