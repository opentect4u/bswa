import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member_gmp_listComponent } from './member_gmp_list.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [{ path: '', component: Member_gmp_listComponent }];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    InputTextModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Member_gmp_listComponent]
})
export class Member_gmp_listModule { }
