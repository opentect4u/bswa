import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsDepoApproveComponent } from './subs-depo-approve.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

const routes:Routes=[
  {path:'',component:SubsDepoApproveComponent}
]

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubsDepoApproveComponent]
})
export class SubsDepoApproveModule { }
