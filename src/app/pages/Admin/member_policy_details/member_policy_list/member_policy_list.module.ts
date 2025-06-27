import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member_policy_listComponent } from './member_policy_list.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';

const routes: Routes = [{ path: '', component: Member_policy_listComponent }];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    InputTextModule,
    RadioButtonModule,
    FormsModule,
    BadgeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Member_policy_listComponent]
})
export class Member_policy_listModule { }
