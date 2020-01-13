import { Component } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import {environment} from "../../../../environments/environment";
const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "mutlipart/form-data" })
};
@Component({
    selector: "my-app",
    templateUrl: "./Addimage.component.html"
})
export class AddImageComponent {
    upload: File[];
    resData: any;
    selectedFile = null;

    constructor(private http: HttpClient) {}

    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }

    onSubmit() {
        const payload = new FormData();
        payload.append("upload[]", this.selectedFile);
        const url = `${environment.apiUrl}/files/upload`;

        this.http
            .post(url, payload, httpOptions
            )
            .subscribe((data: any) => {
                this.resData = data;
                console.log(this.resData);
            });
    }
}
