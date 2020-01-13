import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../../_services/users.service";
import { Account } from "../../models/users.model";
import { PagerService } from "../../../_services/page.service";

@Component({
    selector: "app-tabs",
    templateUrl: "./users.component.html"
})
export class UserComponent implements OnInit {
    pager: any = {};
    pagedItems: any[];
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
            this.setPage(1);
        });
    }
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.accounts.length, page);
        console.log("aaaaaaaaaaaaa",this.accounts.length);
        

        // get current page of items
        this.pagedItems = this.accounts.slice(
            this.pager.startIndex,
            this.pager.endIndex + 1
        );
    }
}
