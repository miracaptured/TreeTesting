import { Injectable } from '@angular/core'; 
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http'; 
import { Observable, tap} from 'rxjs'; 
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class InterceptorService { 
 
  constructor(
    private _router: Router,
    private _auth: AuthService) { }
 
  intercept( 
    request: HttpRequest<any>, 
    next: HttpHandler 
  ): Observable<HttpEvent<any>> { 
    if (!request.headers.has('Content-Type')) { 
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') }); 
    }
    //request = request.clone({ headers: request.headers.set('accept', 'application/json') })
    if (this._auth.getToken() != '') {
      request = request.clone({ 
        setHeaders: {
          Authorization: `Bearer ${this._auth.getToken()}` 
        } 
      });
    }
 
    return next.handle(request).pipe(tap(
      (event) => {
      },
      (err) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status == 401) {
                this._auth.clearStorage();
                this._router.navigate(['/login']);
              }
          }
      }
  )
);
  } 
}