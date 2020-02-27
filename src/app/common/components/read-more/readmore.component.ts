import { Component } from '@angular/core';

@Component({
    selector: 'read-more',
    template: `
        <div class="word-break">
            <div [class.collapsed]="isCollapsed">
                <ng-content></ng-content>
            </div>
            <a (click)="isCollapsed = !isCollapsed">{{isCollapsed?'See More':'Hide'}}</a>
        </div>`,
    styles: [`
        div.collapsed {
            max-height: 35px;
            overflow:hidden;
        }
        .word-break {
            word-break: break-all;
        }
        `
    ]
})

export class ReadMoreComponent {
    isCollapsed = true;
}
