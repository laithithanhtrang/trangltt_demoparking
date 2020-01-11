import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Parking } from "../DemoPages/models/parking.model";
import { Transaction } from "../DemoPages/models/transactions.model";
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
    public getParking(): Observable<Parking[]> {
        return this.http
            .get<Parking[]>(
                `${environment.apiUrl}/admin/get/all/parkings/1000/0`
            )
            .pipe(
                tap(receviedParkings =>
                    console.log(
                        `receivedParkings = ${JSON.stringify(receviedParkings)}`
                    )
                ),
                catchError(error => of([]))
            );
    }

    public getParkingFromId(id: number): Observable<Parking> {
        const url = `${environment.apiUrl}/get/parking/` + id;
        return this.http.get<Parking>(url).pipe(
            tap(selectedParking =>
                console.log(
                    `selected parking = ${JSON.stringify(selectedParking)}`
                )
            ),
            catchError(error => of(new Parking()))
        );
    }
    public addParking(parking: Parking) {
        return this.http.post<Parking>(
            `${environment.apiUrl}/admin/create/parking`,
            {
                ...parking
            },
            httpOptions
        );
    }
    public deleteParking(parkingId: number): Observable<Parking> {
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
    public getallTransaction(): Observable<Transaction[]> {
        return this.http
            .get<Transaction[]>(
                `${environment.apiUrl}/admin/get/all/transactions`,
                httpOptions
            )
            .pipe(
                tap(receviedTransactions =>
                    console.log(
                        `receivedTransactions = ${JSON.stringify(
                            receviedTransactions
                        )}`
                    )
                ),
                catchError(error => of([]))
            );
    }
    public changeParkingstatus(
        id: number,
        status: string
    ): Observable<Parking> {
        const url = `${environment.apiUrl}/admin/verify/parking/` + id;
        return this.http.patch<Parking>(url, { status }, httpOptions).pipe(
            tap(_ => console.log(`changed Parking status with Id=${id}`)),
            catchError(error => of(null))
        );
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
