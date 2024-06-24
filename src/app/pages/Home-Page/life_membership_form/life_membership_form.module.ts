import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Life_membership_formComponent } from './life_membership_form.component';
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
import { FormsModule} from '@angular/forms';
import {Spouse_infoModule} from '../../Admin/spouse_info/spouse_info.module'
import {Gen_dep_formModule} from '../../Admin/gen_dep_form/gen_dep_form.module'
import {Gen_img_uploadModule} from '../../Admin/gen_img_upload/gen_img_upload.module'
import {Life_fee_formModule} from '../../Admin/life_fee_form/life_fee_form.module'
import { DialogModule } from 'primeng/dialog';

const routes:Routes=[
  {path:'',component:Life_membership_formComponent}
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
    FormsModule,
    Spouse_infoModule,
    Gen_dep_formModule,
    Gen_img_uploadModule,
    Life_fee_formModule,
    DialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Life_membership_formComponent]
})
export class Life_membership_formModule { }
