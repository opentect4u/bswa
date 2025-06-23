import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stp_memb_transactionComponent } from './stp_memb_transaction.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const routes:Routes=[
  {path:'',component:Stp_memb_transactionComponent}
]


@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Stp_memb_transactionComponent]
})
export class Stp_memb_transactionModule { }
