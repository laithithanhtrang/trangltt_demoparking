import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../../_services/users.service";
import { User, Owner } from "../../models/users.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.css"]
})
export class TabsComponent implements OnInit {
    public owners: Owner[] = [];
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
            .subscribe(updateParkings => (this.owners = updateParkings));
    }
    disabledOwner(): void {
        const id = +this.route.snapshot.paramMap.get("id");
        console.log(
            `this.route.snapshot.paramMap = ${JSON.stringify(
                this.route.snapshot.paramMap
            )}`
        );
        this.usersService
            .disableOwnerfromService(id)
            .subscribe(changedstatus => {
                console.log("owner", changedstatus);
                return (this.owners = changedstatus);
            });
    }
}
