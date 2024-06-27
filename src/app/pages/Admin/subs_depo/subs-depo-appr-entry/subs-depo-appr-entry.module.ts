import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsDepoApprEntryComponent } from './subs-depo-appr-entry.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:SubsDepoApprEntryComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubsDepoApprEntryComponent]
})
export class SubsDepoApprEntryModule { }
