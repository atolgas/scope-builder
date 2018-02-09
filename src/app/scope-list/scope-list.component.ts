import { Component, OnInit } from '@angular/core';
import { ScopeService } from '../scopes/scope.service';
import { Scopes, Guesses } from '../shared/shared.model';

@Component({
  selector: 'app-scope-list',
  templateUrl: './scope-list.component.html',
  styleUrls: ['./scope-list.component.css']
})
export class ScopeListComponent implements OnInit {
  items: Scopes[];

  constructor(private scopeService: ScopeService) { }

  ngOnInit() {
    this.scopeService.getScopes('/api/ScopeLists')
      .subscribe(
        data => {
          this.items = data;
          console.log(this.items);
        }
      );
  }

}
