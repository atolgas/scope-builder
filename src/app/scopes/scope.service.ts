import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';

import { Scope } from './scope.model';
import { Scopes, Guesses } from '../shared/shared.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ScopeService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json',
                                 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getScopes(url: string): Observable<any> {
    return this.http
        .get(url)
        .map((res: Response) => res.json());
  }

  addScope(url: string, model: any): Observable<any> {
    const body = JSON.stringify(model);
    return this.http
        .post(url, body, this.options)
        .map((res: Response) => res.json());
  }

  addScopeList(url: string, model: Array<string>) {
    const body = model;
    return this.http
      .post(url, body, this.options)
      .map((res: Response) => JSON.stringify(res));
  }

  updateScope(url: string, model: any): Observable<any> {
    const body = JSON.stringify(model);
    return this.http
        .put(url, body, this.options)
        .map((res: Response) => JSON.stringify(res));
  }

  deleteScope(url: string, id: number) {
    return this.http
        .delete(url + id, this.options)
        .map((res: Response) => JSON.stringify(res));
  }

  deleteScopeList(url: string, id: number) {
    return this.http
      .delete(url + id, this.options)
      .map((res: Response) => JSON.stringify(res));
  }

  deleteGuessList(url: string, id: number) {
    return this.http
      .delete(url + id, this.options)
      .map((res: Response) => JSON.stringify(res));
  }
}
