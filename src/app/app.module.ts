import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {AppInterceptorInterceptor} from './Interceptor/app-interceptor.interceptor'
// import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    HttpClientModule,
    // ProgressBarModule,
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, { 
    provide: HTTP_INTERCEPTORS, useClass: AppInterceptorInterceptor, multi:true
  },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
