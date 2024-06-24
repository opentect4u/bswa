import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
// import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';
// import { MessageService } from '../Services/message.service';
// import { ProgressBar } from 'primeng/progressbar';

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {
  // constructor( private spinner: NgxSpinnerService, private msg:MessageService) {}
  // constructor( private spinner: NgxSpinnerService) {}
  // constructor(private spinner: ProgressBar) {}
  constructor(public spinner: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.spinner.showValue = true;
    this.spinner.isLoading.next(true)

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.isLoading.next(false)
          // this.spinner.showValue = false;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const started = Date.now();
        const elapsed = Date.now() - started;
        // this.spinner.hide()
        this.spinner.isLoading.next(false)
        // console.log(`Request for ${req.urlWithParams} failed after ${elapsed} ms.`);
        console.log(error.status);
        // debugger
        if (error.status)
          // this.msg.globalError(error.status+' '+error.statusText+' in '+error.url)
          console.log(error);
        // this.msg.globalError('Unknown error!')
        else console.log(error);

        // debugger;
        return throwError(error);
      })
    );
  }
}