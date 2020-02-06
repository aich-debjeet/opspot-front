import { Component } from '@angular/core';

@Component({
    selector:'readMore',
    template: `
    <div>
    <div [class.collapsed]="isCollapsed" style="word-break: break-all" >
    <ng-content  ></ng-content>
    </div>
        <a  (click)="isCollapsed = !isCollapsed">{{isCollapsed?'See More':'Hide'}}</a>
    </div>
      `,
   styles: [`
    div.collapsed {
        max-height: 35px;
        overflow:hidden;
    }
`]
})


export class ReadMoreComponent {
    isCollapsed = true;
}