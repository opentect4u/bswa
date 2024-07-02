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
import { LoaderComponent } from './pages/Common/loader/loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    HttpClientModule,
    ProgressSpinnerModule
    // ProgressBarModule,
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, { 
    provide: HTTP_INTERCEPTORS, useClass: AppInterceptorInterceptor, multi:true
  },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
