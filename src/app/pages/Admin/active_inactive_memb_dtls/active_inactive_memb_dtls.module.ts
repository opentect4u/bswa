import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Active_inactive_memb_dtlsComponent } from './active_inactive_memb_dtls.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';


const routes:Routes=[
  {path:'',component:Active_inactive_memb_dtlsComponent}
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
    MatSelectModule
  ],
  declarations: [Active_inactive_memb_dtlsComponent]
})
export class Active_inactive_memb_dtlsModule { }
