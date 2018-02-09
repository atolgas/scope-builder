import { Component, OnInit, Input, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import swal from 'sweetalert2';

import { Scope } from '../scope.model';
import { ScopeService } from '../scope.service';
import { AccordionComponent, AccordionGroup} from './../../shared/accordion';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  id: number;
  scopeId: number;
  title: string;
  desc: string;
  scopes: Array<any> = [];
  guesses: Array<any> = [];

  constructor(private scopeService: ScopeService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.scopeService.getScopes('api/Guesses')
          .subscribe(
            data => {
              this.scopeId = data.Data[this.id ]['Id'];
              this.title = data.Data[this.id ]['Title'];
              this.desc = data.Data[this.id ]['Desc'];
              this.scopes = data.Data[this.id]['Scopes'];
              this.guesses = data.Data[this.id]['Guesses'];
              }
          );
          // this.router.navigate(['scopes/' + this.id]);
        }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    const scopeService = this.scopeService;
    const router = this.router;
    const scopeId = this.scopeId;

    swal({
      title: 'Delete',
      text: 'Do you want to continue',
      type: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'OK',
      cancelButtonColor: '#d33',
  }).then(function () {
      scopeService.deleteScope('api/Guesses/', scopeId).subscribe();
      window.setTimeout(() => {
          window.location.href = '/';
        }, 1000);
    },
    (dismiss) => {
      // dismiss can be "cancel" | "close" | "outside"
      'cancel';
    });
  }
}
