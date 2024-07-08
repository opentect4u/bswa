import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembDtlsComponent } from './memb-dtls.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';

const routes:Routes=[
  {path:'',component:MembDtlsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    DividerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MembDtlsComponent]
})
export class MembDtlsModule { }
