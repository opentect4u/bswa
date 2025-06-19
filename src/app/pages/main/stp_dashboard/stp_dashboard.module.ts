import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stp_dashboardComponent } from './stp_dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';

const routes:Routes=[
  {path:'',component:Stp_dashboardComponent}
]

@NgModule({
  imports: [
    CommonModule,
        CardModule,
        RouterModule.forChild(routes)
  ],
  declarations: [Stp_dashboardComponent]
})
export class Stp_dashboardModule { }
