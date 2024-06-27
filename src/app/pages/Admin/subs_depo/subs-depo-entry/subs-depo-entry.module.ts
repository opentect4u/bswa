import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsDepoEntryComponent } from './subs-depo-entry.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

const routes:Routes=[
  {path:'',component:SubsDepoEntryComponent}
]

@NgModule({
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubsDepoEntryComponent]
})
export class SubsDepoEntryModule { }
