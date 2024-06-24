import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembHomeComponent } from './Memb-home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MembHomeComponent,
    data:{pageName:'member'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MembHomeComponent]
})
export class MembHomeModule { }
