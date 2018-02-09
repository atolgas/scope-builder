import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      setTimeout(() => {
        /* Logout active user after 30 minutes  */
        localStorage.removeItem('currentUser');
        window.location.reload();
      }, 1000 * 60 * 90);
    }
  }
}
