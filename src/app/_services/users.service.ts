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
import { Parking } from "../DemoPages/models/parking.component";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import * as _ from "lodash";
import { environment } from "../../environments/environment";
import { User } from '../DemoPages/models/users.component';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Authorization":
    //   "Bearer:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc2LCJyb2xlIjoiYWRtaW4iLCJleHBpcmVkIjoiMjAyMC0wMS0xMlQxNjoxNDozNSswNzowMCJ9.zVD81Wf3K9B7y3BWZ6wgGygrYCV2tGWCeL1h4PBfT5o="
  })
};

@Injectable({
  providedIn: "root"
})
export class UsersService {
  // private events = "http://www.mocky.io/v2/5ddde6382f000039617eaba5";
  getUser(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.apiUrl}`)
      .pipe(
        tap(receviedParkings =>
          console.log(`receivedParkings = ${JSON.stringify(receviedParkings)}`)
        ),
        catchError(error => of([]))
      );
  }
  
  constructor(private http: HttpClient) {}
}
