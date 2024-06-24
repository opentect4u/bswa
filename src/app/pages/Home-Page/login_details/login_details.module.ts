import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login_detailsComponent } from './login_details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: Login_detailsComponent,
    data:{pageName:'login'}
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Login_detailsComponent]
})
export class Login_detailsModule { }
