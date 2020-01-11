import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Parking } from "../DemoPages/models/parking.model";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import * as _ from "lodash";
import { environment } from "../../environments/environment";
import { User } from "../DemoPages/models/users.model";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization:
            "Bearer:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc2LCJyb2xlIjoiYWRtaW4iLCJleHBpcmVkIjoiMjAyMC0wMS0xMlQxNjoxNDozNSswNzowMCJ9.zVD81Wf3K9B7y3BWZ6wgGygrYCV2tGWCeL1h4PBfT5o="
    })
};

@Injectable({
    providedIn: "root"
})
export class UsersService {
    public getOwners(): Observable<User[]> {
        return this.http
            .get<User[]>(
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
    public disableOwnerfromService(credentialId: number): Observable<User[]> {
        const url = `${environment.apiUrl}/admin/disable/owner/` + credentialId;
        return this.http.patch<User[]>(url, credentialId, httpOptions).pipe(
            tap(_ => console.log(`disabled Owner with Id=${credentialId}`)),
            catchError(error => of(null))
        );
    }

    constructor(private http: HttpClient) {}
}
