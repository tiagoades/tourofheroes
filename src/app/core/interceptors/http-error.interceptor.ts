import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {

        let erroMsg = '';

        if(err.error instanceof ErrorEvent){
          erroMsg = `Error: ${err.error.message}`;
        }else{
          erroMsg = `Error Code: ${err.status}, Message: ${err.message}`;
        }

        this.messageService.add(erroMsg);

        return throwError(() => new Error(erroMsg));

      })
    );
  }
}
