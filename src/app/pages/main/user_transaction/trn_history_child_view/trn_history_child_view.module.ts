import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trn_history_child_viewComponent } from './trn_history_child_view.component';
import { CardModule } from 'primeng/card';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';

const routes:Routes=[
  {path:'',component:Trn_history_child_viewComponent}
]

@NgModule({
  imports: [
    CommonModule,
        CardModule,
        ButtonModule,
        RouterModule.forChild(routes)
  ],
  declarations: [Trn_history_child_viewComponent]
})
export class Trn_history_child_viewModule { }
