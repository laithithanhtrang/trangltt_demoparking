import { Component, OnInit, Input } from "@angular/core";
import { Parking } from "../../models/parking.model";
import { ParkingService } from "../../../_services/parking.service";

@Component({
    selector: "app-analytics",
    templateUrl: "./analytics.component.html",
    styleUrls: ["./analytics.component.css"]
})
export class AnalyticsComponent implements OnInit {
    // parking$: Observable<Parking[]>;
    // private searchedSubject = new Subject<string>();

    public parking: Parking[];
    public isActive: true;
    numberActive: number;
    public searchText;
    subTotal = 0;

    constructor(private parkingServiece: ParkingService) {}
    // search(searchedString: string): void {
    //   console.log(`searchedString = ${searchedString}`);
    //   this.searchedSubject.next(searchedString);

    ngOnInit() {
        this.getParkingsfromServices();
        // this.parking$ = this.searchedSubject.pipe(
        //   debounceTime(300), // wait 300ms after each keystroke before considering the searched string
        //   distinctUntilChanged(),// ignore new string if same as previous string
        //   switchMap((searchedString: string) => this.parkingServiece.searchParkings(searchedString))
        // );
    }
    getParkingsfromServices(): void {
        this.parkingServiece.getParking().subscribe(updateParkings => {
            this.parking = updateParkings;
            this.clcSum();
        });
    }

    delete(parkingId: number): void {
        this.parkingServiece
            .deleteParking(parkingId)
            .subscribe(deletedParking => {
                this.parking = this.parking.filter(
                    parking => parking.id !== parkingId
                );
            });
    }
    
    clcSum() {
        this.subTotal = 0;

        for (let parking of this.parking) {
            if (parking.status === "APPROVED") {
                this.subTotal++;
            }
        }
    }
}
