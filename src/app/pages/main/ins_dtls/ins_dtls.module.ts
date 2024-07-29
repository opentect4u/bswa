import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ins_dtlsComponent } from './ins_dtls.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';

const routes:Routes=[
  {path:'',component:Ins_dtlsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    DividerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Ins_dtlsComponent]
})
export class Ins_dtlsModule { }
