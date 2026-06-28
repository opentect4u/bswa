import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Superadmin_loginComponent } from './superadmin_login.component';
import { RouterModule, Routes } from '@angular/router';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MessageService } from 'primeng/api';

const routes: Routes = [{ path: '', component: Superadmin_loginComponent }];


@NgModule({
  imports: [
    CommonModule,
    // InputTextModule,
    // ButtonModule,
    ReactiveFormsModule ,
    ToastModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  declarations: [Superadmin_loginComponent],
  providers: [MessageService],
})
export class Superadmin_loginModule { }
