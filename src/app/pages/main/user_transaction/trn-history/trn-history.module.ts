import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrnHistoryComponent } from './trn-history.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

const routes:Routes=[
  {path:'',component:TrnHistoryComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    DynamicDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrnHistoryComponent]
})
export class TrnHistoryModule { }
