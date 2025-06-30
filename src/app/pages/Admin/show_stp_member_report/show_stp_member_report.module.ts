import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Show_stp_member_reportComponent } from './show_stp_member_report.component';
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
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePipe } from '@angular/common';

const routes:Routes=[
  {path:'',component:Show_stp_member_reportComponent}
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
        TooltipModule,
        CheckboxModule,
        DatePipe,
        RouterModule.forChild(routes)
  ],
  declarations: [Show_stp_member_reportComponent]
})
export class Show_stp_member_reportModule { }
