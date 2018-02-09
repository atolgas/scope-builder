import {Component, Input, OnDestroy, Injectable} from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `
  <ng-content></ng-content>
          `,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'panel-group'
  }
})

export class AccordionComponent {
  groups: Array<AccordionGroup> = [];

  addGroup(group: AccordionGroup): void {
    this.groups.push(group);
  }

  closeOthers(openGroup: AccordionGroup): void {
    this.groups.forEach((group: AccordionGroup) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }

  removeGroup(group: AccordionGroup): void {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
}

@Injectable()

@Component({
  selector: 'app-accordion-group',
  template: `
                <div class="panel panel-default" [ngClass]="{'panel-open': isOpen}">
                  <div class="panel-heading" (click)="toggleOpen($event)">
                    <h4 class="panel-title">
                      <a href tabindex="0"><span>{{heading}}</span>
                      <i
                        class="fa"
                        [ngClass]="{'fa-chevron-up':isOpen,'fa-chevron-down':!isOpen}">
                        </i></a>
                    </h4>
                  </div>
                  <div class="panel-collapse" [hidden]="!isOpen">
                    <div class="panel-body">
                        <ng-content></ng-content>
                    </div>
                  </div>
                </div>
          `,

})

// tslint:disable-next-line:component-class-suffix
export class AccordionGroup implements OnDestroy {
  private _isOpen = false;

  @Input() heading: string;

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOthers(this);
    }
  }

  get isOpen() {
    return this._isOpen;
  }

  constructor(private accordion: AccordionComponent) {
    this.accordion.addGroup(this);
  }

  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }

  toggleOpen(event: MouseEvent): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }
}
