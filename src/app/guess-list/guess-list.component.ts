import { Component, OnInit } from '@angular/core';
import { ScopeService } from '../scopes/scope.service';
import { Scopes, Guesses } from '../shared/shared.model';

@Component({
  selector: 'app-guess-list',
  templateUrl: './guess-list.component.html',
  styleUrls: ['./guess-list.component.css']
})
export class GuessListComponent implements OnInit {
  items: Guesses[];

  constructor(private scopeService: ScopeService) { }

  ngOnInit() {
    this.scopeService.getScopes('/api/GuessLists')
      .subscribe(
        data => {
          this.items = data;
          console.log(this.items);
        }
      );
  }

}
