import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Change_password_stp_memberComponent } from './change_password_stp_member.component';
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
  {path: '', component: Change_password_stp_memberComponent}
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ToastModule,
  ],
  declarations: [Change_password_stp_memberComponent]
})
export class Change_password_stp_memberModule { }
