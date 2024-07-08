import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepoTrnsComponent } from './depo-trns.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

const routes:Routes=[
  {path:'',component:DepoTrnsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    CardModule,
    RouterModule.forChild(routes)
],
  declarations: [DepoTrnsComponent]
})
export class DepoTrnsModule { }
