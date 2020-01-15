import { Component, OnInit, createPlatformFactory } from "@angular/core";
import { Parking } from "../../models/parking.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ParkingService } from "../../../_services/parking.service";

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Component({
    selector: "app-Addparking",
    templateUrl: "./Addparking.component.html"
})
export class ParkingsComponent implements OnInit {
    parking: Parking[] = [];
    addParkingForm: FormGroup;
    loading = false;
    filetoUpload: File = null;
    public capacityPattern = "^((?+?[0-9]*)?)?[0-9_- ()]*$";
    public capacityError = "";

    constructor(
        private parkingService: ParkingService,
        private fb: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) {}
    ngOnInit() {
        this.addParkingForm = this.fb.group({
            parkingName: ["", [Validators.required]],
            capacity: [""],
            address: [""],
            payment:[""],
            kindOf:[""],
            blockAmount: [""],
            describe: [""],
            parkingImages: [""],
            phoneNumber: [""],
            credential: [""],
            fullName: [""],
            parkings: [""],
            created_at: [""],
            latitude: [""],
            longitude: [""]
        });
    }

    get f() {
        return this.addParkingForm.controls;
    }
    add() {
        if (this.addParkingForm.invalid) {
            return;
        }
        this.loading = true;
        this.parkingService
            .addParking({
                parkingName: this.f.parkingName.value,
                capacity: this.f.capacity.value,
                address: this.f.address.value,
                payment: this.f.payment.value,
                kindOf: this.f.kindOf.value,
                blockAmount: this.f.blockAmount.value,
                describe: this.f.describe.value,
                parkingImages: this.f.parkingImages.value,
                phoneNumber: this.f.phoneNumber.value,
                credential: this.f.credential.value,
                fullName: this.f.fullName.value,
                parkings: this.f.parkings.value,
                created_at: this.f.created_at.value,
                latitude: this.f.latitude.value,
                longitude: this.f.longitude.value
            })
            .subscribe(
                addParking => {
                    this.loading = false;
                    this.addParkingForm.reset();
                },
                error => {}
            );
    }
}
//     validateCapacity() {
//         if (this.addParkingForm.get("capacity").value === "") {
//             this.capacityError = "Capacity is required";
//         } else if (this.addParkingForm.get("phone").invalid) {
//             this.capacityError = "Capacity is require, is number";
//         }
//         return (
//             this.addParkingForm.get("capacity").invalid &&
//             (this.addParkingForm.get("capacity").touched ||
//                 this.addParkingForm.get("capacity").dirty)
//         );
//     }
// }
