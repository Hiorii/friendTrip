import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class HttpSpinnerInterceptorService implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    if (isApiUrl) {
      this.spinner.show();
    }

    return next.handle(req)
      .pipe(
        map(res => {
          if (res instanceof HttpResponse) {
            this.spinner.hide();
          }
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          this.spinner.hide();
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          throw new Error(errorMsg);
        })
      )
  }
}
