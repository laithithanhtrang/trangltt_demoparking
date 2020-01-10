import { Component, OnInit } from "@angular/core";
import { Parking } from "../../models/parking.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ParkingService } from "../../../_services/parking.service";
import { Route } from "@angular/compiler/src/core";

@Component({
  selector: "app-Addparking",
  templateUrl: "./Addparking.component.html"
})
export class ParkingsComponent implements OnInit {
  parking: Parking[] = [];
  addParkingForm: FormGroup;
  loading = false;

  constructor(
    private parkingService: ParkingService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.addParkingForm = this.fb.group({
      parkingName: ["", Validators.required],
      capacity: [""],
      address: [""],
      blockAmount: [""],
      describe: [""],
      parkingImages: [""],
      phoneNumber: [""],
      credential: [""],
      fullName: [""],
      parkings: [""],
      created_at: [""]
    });
  }

  get f() {
    return this.addParkingForm.controls;
  }
  add() {
    this.loading = true;
    this.parkingService
      .addParking({
        parkingName: this.f.parkingName.value,
        capacity: this.f.capacity.value,
        address: this.f.address.value,
        blockAmount: this.f.blockAmount.value,
        describe: this.f.describe.value,
        parkingImages: this.f.parkingImages.value,
        phoneNumber: this.f.phoneNumber.value,
        credential: this.f.credential.value,
        fullName: this.f.fullName.value,
        parkings: this.f.parkings.value,
        created_at: this.f.created_at.value
      })
      .subscribe(
        addParking => {
          this.loading = false;
          this.addParkingForm.reset();
          this.router.navigate(["/''"]);
        },
        error => {}
      );
  }
}
