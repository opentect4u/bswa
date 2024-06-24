import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceHomeComponent } from './Insurance-home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InsuranceHomeComponent,
    data:{pageName:'insurance'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsuranceHomeComponent]
})
export class InsuranceHomeModule { }
