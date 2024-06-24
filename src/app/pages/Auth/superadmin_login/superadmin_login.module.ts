import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Superadmin_loginComponent } from './superadmin_login.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [{ path: '', component: Superadmin_loginComponent }];


@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule ,
    ToastModule,
    RouterModule.forChild(routes),
  ],
  declarations: [Superadmin_loginComponent]
})
export class Superadmin_loginModule { }
