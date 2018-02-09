import { AuthenticationService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { OnChanges, AfterContentInit, AfterContentChecked } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAuth = false;
  returnUrl: string;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
              }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.isAuth = true;
    } else {
      setTimeout(() => {
        this.isAuth = false;
      }, 1000);
    }
  }

  onLogout() {
    this.authService.logout();

    window.location.href = '/login';

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.router.navigate([this.returnUrl]);

  }
}
