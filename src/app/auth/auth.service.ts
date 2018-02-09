import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  headers: Headers;
  options: RequestOptions;
    constructor(private http: Http) {}

    login(username: string, password: string) {
        // let body = JSON.stringify(model);

        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json' });
        const options = ({ headers: this.headers });

        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        body.set('grant_type', 'password');

        return this.http.post('http://localhost:65179/Token', body.toString() , options)
          .map((response: Response) => {
            // login successful if there's a jwt token in the response
            const user = response.json();
            localStorage.setItem('currentUser', JSON.stringify(user));
            // console.log(localStorage);
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                // console.log(localStorage)
            }
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
