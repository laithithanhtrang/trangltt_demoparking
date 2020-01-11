import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../../_services/users.service";
import { User } from "../../models/users.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.css"]
})
export class TabsComponent implements OnInit {
    public users: User[] = [];
    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) {}

    ngOnInit() {
        this.getOwnersfromServices();
    }
    getOwnersfromServices(): void {
        this.usersService
            .getOwners()
            .subscribe(updateParkings => (this.users = updateParkings));
    }
    disabledOwner(id): void {
        // const credentialId= +this.route.snapshot.paramMap.get("credentialId");
        console.log("HUYTESTTTT", id);

        console.log(
            `this.route.snapshot.paramMap = ${JSON.stringify(
                this.route.snapshot.paramMap
            )}`
        );
        this.usersService
            .disableOwnerfromService(id)
            .subscribe(disabledOwner => {
                console.log("parking", disabledOwner);
                return (this.users = disabledOwner);
            });
    }
}
