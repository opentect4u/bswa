import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stp_member_trans_viewComponent } from './stp_member_trans_view.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

const routes:Routes=[
  {path:'',component:Stp_member_trans_viewComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Stp_member_trans_viewComponent]
})
export class Stp_member_trans_viewModule { }
