import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { of } from "rxjs";
import { catchError, mapTo, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { AdminAuth } from "../DemoPages/models/admin.model";
import { Tokens } from "../DemoPages/models/tokens.component";

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject: BehaviorSubject<AdminAuth>;
  public currentUser: Observable<AdminAuth>;
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private loggedUser: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AdminAuth>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/login`, user).pipe(
      tap(tokens => this.doLoginAdmin(user.username, tokens)),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }

  public get currentUserValue(): AdminAuth {
    return this.currentUserSubject.value;
  }
  private doLoginAdmin(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }
  isLoggedIn() {
    return !!this.getJwtToken();
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
  }
}
