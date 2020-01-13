import { Injectable } from "@angular/core";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../_services/authen.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            this.router.navigate(["/''"]);
        }
        return false;
    }
}
