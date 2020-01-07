import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../../_services/users.service";
import { User } from "../../models/users.component";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html"
})
export class TabsComponent implements OnInit {
  public users: User[];
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsersfromServices();
  }
  getUsersfromServices(): void {
    this.usersService
      .getUser()
      .subscribe(updateUsers => (this.users = updateUsers));
  }
}
