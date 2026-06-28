import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsDepoEntryComponent } from './subs-depo-entry.component';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


const routes:Routes=[
  {path:'',component:SubsDepoEntryComponent}
]

@NgModule({
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubsDepoEntryComponent]
})
export class SubsDepoEntryModule { }
