import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [{ path: '', component: MemberListComponent }];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    InputTextModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MemberListComponent]
})
export class MemberListModule { }
