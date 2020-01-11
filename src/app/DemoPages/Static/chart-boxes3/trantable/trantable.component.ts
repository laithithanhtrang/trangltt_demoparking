import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "../../../models/transactions.model";
import { Parking } from "../../../models/parking.model";
import { ParkingService } from "../../../../_services/parking.service";

@Component({
    selector: "app-trantable",
    templateUrl: "./trantable.component.html"
})
export class TransactionsComponent implements OnInit {
    public transactions: Transaction[];
    public parking: Parking[];
    public isActive: true;
    numberActive: number;
    public searchText;

    constructor(private parkingServiece: ParkingService) {}

    ngOnInit() {
        this.getTransfromServices();
        this.getParkingsfromServices();
    }

    getParkingsfromServices(): void {
        this.parkingServiece.getParking().subscribe(updateParkings => {
            this.parking = updateParkings;
        });
    }
    getTransfromServices(): void {
        this.parkingServiece
            .getallTransaction()
            .subscribe(updateTransactions => {
                this.transactions = updateTransactions;
            });
    }

    getParkingName(id: number) {
        const found = this.parking.find(parking => parking.id === id); // tim bai do co id trung voi id cua giao dich
        return found.address;
    }
}
