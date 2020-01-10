import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Color } from "ng2-charts/ng2-charts";
import { Parking } from "../../models/parking.model";
import { HttpUrlEncodingCodec } from "@angular/common/http";
import { NgbHighlight } from "@ng-bootstrap/ng-bootstrap";
import { ParkingService } from "../../../_services/parking.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.css"],
  
})
export class AnalyticsComponent implements OnInit {
  // parking$: Observable<Parking[]>;
  // private searchedSubject = new Subject<string>();

  public parking: Parking[];
  public isActive: true;
  numberActive: number;
  public searchText;

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
    this.parkingServiece
      .getParking()
      .subscribe(updateParkings => (this.parking = updateParkings));
    // this.clcActive(this.parking);
    //console.log(Parking);
  }

  delete(parkingId: number): void {
    this.parkingServiece.deleteParking(parkingId).subscribe(deletedParking => {
      this.parking = this.parking.filter(parking => parking.id !== parkingId);
    });
  }

  // clcActive(parkings) {
  //   this.numberActive = 0;
  //   // console.log(this.parking);
  //   for (let parking of parkings) {
  //     if (parking.status === "pending") {
  //       this.numberActive++;
  //       console.log(this.numberActive);
  //     }
  //   }
  // }
}
