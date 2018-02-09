import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService } from '../auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      this.initLoginForm();
  }

  initLoginForm() {
    // const email = 'atolgas@scopebuilder.com';
    // const password = '172290_Tolga';
    const email = '';
    const password = '';
    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.loginForm = new FormGroup({
      'Email': new FormControl(email, [Validators.required, Validators.pattern(emailRegex) ]),
      'Password': new FormControl(password, Validators.required),
    });
  }

  login() {
    const router = this.router;
    const returnUrl = this.returnUrl;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value['Email'], this.loginForm.value['Password'])
    .subscribe(
      data => {
            swal({
              title: 'Welcome',
              text: 'You are logging succesfully',
              type: 'success'
            })
            .then(function () {
              router.navigate([returnUrl]);
              window.location.href = returnUrl;
            });
      },
      error => {
        swal({
          title: 'Error',
          text: 'Your email or password incorrect',
          type: 'error'
        })
      }
    );
  }
}
