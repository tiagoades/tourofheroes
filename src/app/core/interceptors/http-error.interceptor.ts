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
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {

        if(!environment.production){
          console.log(err);
        }

        let erroMsg = '';

        if(err.error instanceof ErrorEvent){
          erroMsg = `Error: ${err.error.message}`;
        }else if(err.error.error.length){ //Vem como um array, se  o error é um array e se esta diferente de vazio
          erroMsg = `Error: ${err.error.error}`; //Pego o primeiro item do array para imprimir na tela
        }else if(err.error.errors){
          erroMsg = `Error: ${err.error.errors}`
        }

        else{
          erroMsg = `Error Code: ${err.status}, Message: ${err.message}`;
        }

        this.messageService.add(erroMsg);

        return throwError(() => new Error(erroMsg));

      })
    );
  }
}
