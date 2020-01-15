import { Component, OnInit,Input } from "@angular/core";
import { UsersService } from "../../../_services/users.service";
import { Account } from "../../models/users.model";
import { PagerService } from "../../../_services/page.service";

@Component({
    selector: "app-tabs",
    templateUrl: "./users.component.html"
})
export class UserComponent implements OnInit {
    @Input() pageSize = 8;
    @Input() page = 10;
    public accounts: Account[] = [];
    pageofAccount: Array<any>;
    constructor(
        private usersService: UsersService,
        private pagerService: PagerService
    ) {}

    ngOnInit() {
        this.getAccountsfromServices();
    }

    getAccountsfromServices(): void {
        this.usersService.getAccounts().subscribe(updateUsers => {
            this.accounts = updateUsers;
        });
    }

}
