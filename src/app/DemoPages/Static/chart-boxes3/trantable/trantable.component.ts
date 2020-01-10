import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "../../../models/transactions.model";
import { ParkingService } from "../../../../_services/parking.service";

@Component({
  selector: "app-trantable",
  templateUrl: "./trantable.component.html"
})
export class TransactionsComponent implements OnInit {
  public transactions: Transaction[];
  public isActive: true;
  numberActive: number;
  public searchText;

  constructor(private parkingServiece: ParkingService) {}

  ngOnInit() {
    this.getTransfromServices();
  }
  getTransfromServices(): void {
    this.parkingServiece
      .getallTransaction()
      .subscribe(updateTransactions => (this.transactions = updateTransactions));
  }
}
