import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asso_mem_formComponent } from './asso_mem_form.component';
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
import { Asso_intro_memModule } from '../asso_intro_mem/asso_intro_mem.module';
import { Asso_dep_formModule } from '../asso_dep_form/asso_dep_form.module';
import { Asso_img_uploadModule } from '../asso_img_upload/asso_img_upload.module'
import { Asso_fee_formModule } from '../asso_fee_form/asso_fee_form.module'

const routes:Routes=[
  {path:'',component:Asso_mem_formComponent}
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
    Asso_intro_memModule,
    Asso_dep_formModule,
    Asso_img_uploadModule,
    Asso_fee_formModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Asso_mem_formComponent]
})
export class Asso_mem_formModule { }
