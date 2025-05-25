import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trn_history_childComponent } from './trn_history_child.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

const routes:Routes=[
  {path:'',component:Trn_history_childComponent}
]

@NgModule({
  imports: [
    CommonModule,
        CardModule,
        TableModule,
        DynamicDialogModule,
        RouterModule.forChild(routes)
  ],
  declarations: [Trn_history_childComponent]
})
export class Trn_history_childModule { }
