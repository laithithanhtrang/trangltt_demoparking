import { Component, OnInit } from "@angular/core";
import { Parking } from "../../models/parking.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ParkingService } from "../../../_services/parking.service";
import { environment } from "../../../../environments/environment";
import { Route } from "@angular/compiler/src/core";
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

    constructor(
        private parkingService: ParkingService,
        private fb: FormBuilder,
        private router: Router,
        private http: HttpClient
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
    fileProgress(fileInput: any) {
        this.filetoUpload = <File>fileInput.target.files[0];
    }

    onSubmit() {
        this.loading = true;
        const url = `${environment.apiUrl}/files/upload`;
        const formData = new FormData();
        formData.append("upload[]", this.filetoUpload);
        this.http.post(url, formData, httpOptions).subscribe(success => {
            if (success) {
                this.loading = false;
            }
        });
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
