import { AccordionComponent } from './../../shared/accordion';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { ScopeService } from './../scope.service';
import { Scope } from '../scope.model';
import { AccordionGroup } from '../../shared/accordion';



@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [AccordionGroup, AccordionComponent]
})
export class GridComponent implements OnInit, OnDestroy {
  items: Scope[];
  subscription: Subscription;

  constructor(private scopeService: ScopeService,
              private router: Router,
              private route: ActivatedRoute,
              private accordion: AccordionGroup) {
  }

  ngOnInit() {
    return this.scopeService.getScopes('api/Guesses')
      .subscribe(
        data => {
          this.items = data.Data;
        });
  }

  onNew() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
