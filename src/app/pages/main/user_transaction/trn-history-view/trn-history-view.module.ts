import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrnHistoryViewComponent } from './trn-history-view.component';
import { CardModule } from 'primeng/card';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';

const routes:Routes=[
  {path:'',component:TrnHistoryViewComponent}
]

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TrnHistoryViewComponent]
})
export class TrnHistoryViewModule { }
