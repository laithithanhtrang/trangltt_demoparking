import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import * as _ from "lodash";
import { environment } from "../../environments/environment";
import { Owner } from "../DemoPages/models/users.model";

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
    providedIn: "root"
})
export class UsersService {
    public getOwners(): Observable<Owner[]> {
        return this.http
            .get<Owner[]>(
                `${environment.apiUrl}/admin/get/all/owners`,
                httpOptions
            )
            .pipe(
                tap(receviedOwners =>
                    console.log(
                        `received Owners = ${JSON.stringify(receviedOwners)}`
                    )
                ),
                catchError(error => of([]))
            );
    }
    public disableOwnerfromService(credentialId: number): Observable<Owner[]> {
        const url = `${environment.apiUrl}/admin/disable/owner/` + credentialId;
        return this.http
            .patch<Owner[]>(url, { credentialId }, httpOptions)
            .pipe(
                tap(_ => console.log(`disabled Owner with Id=${credentialId}`)),
                catchError(error => of(null))
            );
    }

    constructor(private http: HttpClient) {}
}
