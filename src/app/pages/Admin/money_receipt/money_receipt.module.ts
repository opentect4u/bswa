import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Money_receiptComponent } from './money_receipt.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { InputTextModule } from 'primeng/inputtext';
import { MatButtonModule } from '@angular/material/button';
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
import { MatDividerModule } from '@angular/material/divider';


const routes:Routes=[
  {path:'',component:Money_receiptComponent}
]

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    InputTextModule,
    MatButtonModule,
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
    MatDividerModule,
    RouterModule.forChild(routes)
  ],
  exports: [Money_receiptComponent],
  declarations: [Money_receiptComponent]
})
export class Money_receiptModule { }
