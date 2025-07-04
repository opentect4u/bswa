import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member_loginComponent } from './member_login.component';
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

const routes: Routes = [{ path: '', component: Member_loginComponent }];


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
  declarations: [Member_loginComponent]
})
export class Member_loginModule { }
