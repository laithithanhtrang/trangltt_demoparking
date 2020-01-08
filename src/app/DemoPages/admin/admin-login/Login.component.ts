import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validator, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "../../../_services/authen.service";

@Component({
  selector: "app-Login",
  templateUrl: "./Login.component.html",
  styleUrls: ["./Login.component.css"]
})
export class LoginBoxedComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  login(user: { username: string, password: string }) {
    this.authService
      .login({
        username: this.f.username.value,
        password: this.f.password.value
      })
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/""']);
        }
      });
  }

  ngOnInit() {}
}
