import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
// import { NgChartsModule } from 'ng2-charts';

const routes:Routes=[
  {path:'',component:DashboardComponent}
]

@NgModule({
  imports: [
        CommonModule,
        CardModule,
        MatCardModule,
        MatDividerModule,
        // NgChartsModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
