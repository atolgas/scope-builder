import { AccordionGroup } from './../../../shared/accordion';
import { Component, OnInit, Input, OnDestroy, group, Injectable } from '@angular/core';
import { Scope } from '../../scope.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() scope: Scope;
  @Input() index: number;
  id: number;

  ngOnInit() {
  }

  constructor(private accordion: AccordionGroup,
              private route: ActivatedRoute) {}
}
