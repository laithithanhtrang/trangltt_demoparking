import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { AdminAuth } from "../DemoPages/models/admin.model";

@Injectable({ providedIn: "root" })
export class AuthService {
    private currentUserSubject: BehaviorSubject<AdminAuth>;
    public currentUser: Observable<AdminAuth>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<AdminAuth>( //set to global
            JSON.parse(localStorage.getItem("currentUser"))
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AdminAuth {
        return this.currentUserSubject.value;
    }

    login( username: string, password: string): Observable<boolean> {
        return this.http
            .post<any>(`${environment.apiUrl}/login`, {
                username,
                password
            })
            .pipe(
                map(user => {
                    //lưu thông tin người dùng và token để duy trì đăng nhập khi chuyển đổi giữa các trang
                    if (user && user.token) {
                        localStorage.setItem(
                            "currentUser",
                            JSON.stringify(user)
                        );
                        this.currentUserSubject.next(user);
                    }

                    return user;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    }
}
