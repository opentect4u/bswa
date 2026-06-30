import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trn_history_childComponent } from './trn_history_child.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const routes:Routes=[
  {path:'',component:Trn_history_childComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    DynamicDialogModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Trn_history_childComponent]
})
export class Trn_history_childModule { }
