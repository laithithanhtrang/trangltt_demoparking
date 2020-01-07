import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Parking } from "../DemoPages/models/parking.component";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";
import * as _ from "lodash";
import { environment } from "../../environments/environment";
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
export class ParkingService {
  getParking(): Observable<Parking[]> {
    return this.http.get<Parking[]>(`${environment.apiUrl}`).pipe(
      tap(receviedParkings =>
        console.log(`receivedParkings = ${JSON.stringify(receviedParkings)}`)
      ),
      catchError(error => of([]))
    );
  }

  getParkingFromId(id: number): Observable<Parking> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.get<Parking>(url).pipe(
      tap(selectedParking =>
        console.log(`selected parking = ${JSON.stringify(selectedParking)}`)
      ),
      catchError(error => of(new Parking()))
    );
  }
  addParking(newParking: Parking): Observable<Parking> {
    return this.http
      .post<Parking>(`${environment.apiUrl}`, newParking, httpOptions)
      .pipe(
        tap(updatedParking =>
          console.log(`updated parking = ${JSON.stringify(updatedParking)}`)
        ),
        catchError(error => of(new Parking()))
      );
  }
  deleteParking(parkingId: number): Observable<Parking> {
    if (confirm("Bạn đồng ý xóa bãi đỗ này ?")) {
      return this.http
        .delete<Parking>(
          `${environment.apiUrl}/admin/get/all/parkings` + parkingId
        )
        .pipe(
          tap(deletedParking =>
            console.log(`deleted Parking with Id=${parkingId}`)
          ),
          catchError(error => of(null))
        );
    }
  }
  // searchParkings(typedString: string): Observable<Parking[]> {
  //   if (!typedString.trim()) {
  //     return of([]);
  //   }
  //   return this.http
  //     .get<Parking[]>(`${this.parkingURL}?name_like=${typedString}`)
  //     .pipe(
  //       tap(foundedParking =>
  //         console.log(`founded parkings = ${JSON.stringify(foundedParking)}`)
  //       ),
  //       catchError(error => of(null))
  //     );
  // }
  constructor(private http: HttpClient) {}
}
