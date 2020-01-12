import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
        const url = "http://10.124.0.32:8080/api/files/upload";

        this.http
            .post(url, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    Authorization:
                        "Bearer:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc2LCJyb2xlIjoiYWRtaW4iLCJleHBpcmVkIjoiMjAyMC0wMS0xOVQwOTo1MjoyNiswNzowMCJ9.Lr2ietUywwMyI4h0kICDUOKbuV3C3lDzNm/0PcjEeXs="
                }
            })
            .subscribe((data: any) => {
                this.resData = data;
                console.log(this.resData);
            });
    }
}
