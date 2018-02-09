import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray, FormBuilder, Validator } from '@angular/forms';
import { AuthenticationService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';

@Injectable()

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    @Input() Password = '';
    @Input() ConfirmPassword = '';


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
      this.initRegisterForm();
    }

    initRegisterForm() {
        const name = '';
        const email = '';
        const password = '';
        const confirmPassword = '';
        const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        const nameRegex = '[a-zA-ZğüşöçİĞÜŞÖÇ ]*';
        const passRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,}$';

         this.registerForm = this.fb.group({
          'Name': [name, Validators.compose([Validators.required, Validators.pattern(nameRegex), Validators.minLength(5)])],
          'Email': [email, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
          'Password': [password, Validators.compose([Validators.required, Validators.pattern(passRegex)])],
          'ConfirmPassword': [confirmPassword, Validators.compose([Validators.required])]
        }, {validator: this.passwordConfirming });
    }

    passwordConfirming(AC: AbstractControl) {
      const password = AC.get('Password').value; // to get value in input tag
      const confirmPassword = AC.get('ConfirmPassword').value; // to get value in input tag
       if (password !== confirmPassword) {
           console.log('false');
           AC.get('ConfirmPassword').setErrors( {MatchPassword: true} );
       } else {
           console.log('true');
           return null;
       }
    }

    register() {
      const router = this.router;
      this.loading = true;
      this.userService.create(this.registerForm.value)
      .subscribe(
        data => {
            swal({
              title: 'Registration',
              text: 'Your user created',
              type: 'success'
              })
                .then(function () {
                  router.navigate(['/login']);
              });
        },
        error => {
            swal({
              title: 'Error',
              text: 'Registration is not successful',
              type: 'error'
              })
                .then(function () {
                  this.loading = false;
              });
        });
    }
}
