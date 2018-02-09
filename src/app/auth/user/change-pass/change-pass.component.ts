import { FormGroup, FormControl, Validator, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../auth.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  changePassForm: FormGroup;

  constructor( private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const oldPass = '';
    const newPass = '';
    const confirmPass = '';
    const passRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,}$';
    const userId = '471d3c2f-3a57-4bf6-9e18-3c726c7dbe0b';

    this.changePassForm = this.fb.group({
      'OldPassword': [oldPass, Validators.compose([Validators.required, Validators.pattern(passRegex)])],
      'NewPassword': [newPass, Validators.compose([Validators.required, Validators.pattern(passRegex)])],
      'ConfirmPassword': [confirmPass, Validators.compose([Validators.required])],
      'UserId': [userId]
    }, {validator: this.passwordConfirming });
  }


  passwordConfirming(AC: AbstractControl) {
    const newPassword = AC.get('NewPassword').value; // to get value in input tag
    const confirmPassword = AC.get('ConfirmPassword').value; // to get value in input tag
     if (newPassword !== confirmPassword) {
         // console.log('false');
         AC.get('ConfirmPassword').setErrors( {MatchPassword: true} );
     } else {
         // console.log('true');
         return null;
     }
  }

  onSubmit() {
    const router = this.router;

    this.userService.update(this.changePassForm.value)
      .subscribe();
  }
}
