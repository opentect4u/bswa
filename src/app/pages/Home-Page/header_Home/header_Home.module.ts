import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { header_HomeComponent } from './header_Home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [header_HomeComponent],
  exports: [header_HomeComponent],
})
export class header_HomeModule {}
