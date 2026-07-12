import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpdateMobileNoComponent } from './update_mobile_no.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UpdateMobileNoComponent
  }
];

@NgModule({
  declarations: [UpdateMobileNoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateMobileNoModule { }
