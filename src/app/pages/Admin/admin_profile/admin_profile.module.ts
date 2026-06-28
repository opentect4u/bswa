import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin_profileComponent } from './admin_profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const routes:Routes=[
  {path:'',component:Admin_profileComponent}
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ToastModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Admin_profileComponent]
})
export class Admin_profileModule { }
