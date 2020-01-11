import { Component, OnInit, Injectable } from "@angular/core";
import { ParkingService } from "../../../_services/parking.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-parkingDetail",
    templateUrl: "./parkingDetail.component.html",
    styleUrls: ["./parkingDetail.component.css"]
})
export class parkingDetailComponent implements OnInit {
    public parking: any;

    constructor(
        private route: ActivatedRoute,
        private parkingService: ParkingService
    ) {}

    ngOnInit() {
        this.getParkingFromRoute();
    }
    getParkingFromRoute(): void {
        const id = +this.route.snapshot.paramMap.get("id");
        console.log(
            `this.route.snapshot.paramMap = ${JSON.stringify(
                this.route.snapshot.paramMap
            )}`
        );
        // goi Service toi " get parking from id"
        this.parkingService.getParkingFromId(id).subscribe(parking => {
            console.log("parking", parking);

            return (this.parking = parking);
        });
    }
    changeStatusParkingFromId(status: string): void {
        const id = +this.route.snapshot.paramMap.get("id");
        console.log(
            `this.route.snapshot.paramMap = ${JSON.stringify(
                this.route.snapshot.paramMap
            )}`
        );
        this.parkingService
            .changeParkingstatus(id, status)
            .subscribe(changedstatus => {
                console.log("parking", changedstatus);
                return (this.parking = changedstatus);
            });
    }
}
