import { Component, OnInit } from "@angular/core";
import { Parking } from "../../models/parking.component";
import { ParkingService } from "../../../_services/parking.service";

@Component({
  selector: "app-Addparking",
  templateUrl: "./Addparking.component.html"
})
export class ParkingsComponent implements OnInit {
  parkings:Parking[] = [];
  constructor(private parkingService: ParkingService) {}
  ngOnInit() {}
  

  //them data mot bai do xe
  add(
    parkingName: string,
    capacity: string,
    address: string,
    blockAmount: number,
    describe: string,
    // parkingImages: string,
  ): void {
    if (!parkingName || !address) {
      alert("Tên bãi đỗ và địa điểm không được để trống");
      return;
    }
    const newParking: Parking = new Parking();
    newParking.parkingName = parkingName;
    newParking.capacity = capacity;
    newParking.address = address;
    newParking.blockAmount = blockAmount;
    newParking.describe=describe;
    // newParking.parkingImages = parkingImages;
    this.parkingService.addParking(newParking).subscribe(insertedParking => {
      this.parkings.push(insertedParking);
      console.log(insertedParking)
    });
  }
}
