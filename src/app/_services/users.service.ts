// import { Injectable } from "@angular/core";
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { User } from "../DemoPages/models/users.component";
// import { Observable } from "rxjs/Observable";
// import { of } from "rxjs/observable/of";
// import { catchError, map, tap } from "rxjs/operators";
// import { environment } from "../../environments/environment";
// import * as _ from "lodash";
// const httpOptions = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Authorization":
//       "Bearer:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc2LCJyb2xlIjoiYWRtaW4iLCJleHBpcmVkIjoiMjAyMC0wMS0xMlQxNjoxNDozNSswNzowMCJ9.zVD81Wf3K9B7y3BWZ6wgGygrYCV2tGWCeL1h4PBfT5o="
//   })
// };

// @Injectable({
//   providedIn: "root"
// })
// export class UsersService {
//   getUser(): Observable<User[]> {
//     return this.http
//       .get<User[]>(`${environment.apiUrl}/admin/get/all/owners/1/0`)
//       .pipe(
//         tap(receviedUsers =>
//           console.log(`receivedUsers = ${JSON.stringify(receviedUsers)}`)
//         ),
//         catchError(error => of([]))
//       );
//   }
//   constructor(private http: HttpClient) {}
// }
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
    const url = "http://localhost:3005/parkings";
    return (
      this.http
        // .get<User[]>(
        //   `${environment.apiUrl}/admin/get/all/owners/1000/0`,
        //   httpOptions
        // )
        .get<User[]>(url)
        .pipe(
          tap(receviedOwners =>
            console.log(`received Owners = ${JSON.stringify(receviedOwners)}`)
          ),
          catchError(error => of([]))
        )
    );
  }
  public disableOwnerfromService(crendentialId: number): Observable<User[]> {
    const url = `${environment.apiUrl}/admin/disable/owner/` + crendentialId;
    return this.http.put<User[]>(url, crendentialId, httpOptions).pipe(
      tap(_ => console.log(`disabled Owner with Id=${crendentialId}`)),
      catchError(error => of(null))
    );
  }

  constructor(private http: HttpClient) {}
}
