import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from '../_services/authen.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // them token vào header nếu token khả dụng
    let currentUser = this.authenticationService.currentUserValue;
    console.log("aaaaaaaaaaaaaaa",currentUser.token)
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer:${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
