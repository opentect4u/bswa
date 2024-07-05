import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member_policy_editComponent } from './member_policy_edit.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [{ path: '', component: Member_policy_editComponent }];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    DividerModule,
    InputTextareaModule,
    FileUploadModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Member_policy_editComponent]
})
export class Member_policy_editModule { }
