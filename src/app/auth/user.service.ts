import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from './user.model';


@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('api/Account/UserInfo', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: string) {
        return this.http.get('api/Account/UserInfo' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post( 'api/Account/Register', user, this.jwt());
    }

    update(user: User) {
        return this.http.post( 'api/Account/ChangePassword', user, this.jwt());
    }

    delete(id: string) {
        return this.http.delete( 'api/Account/UserInfo/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
          const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
