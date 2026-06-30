import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes:Routes=[
  {path:'',component:DashboardComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
