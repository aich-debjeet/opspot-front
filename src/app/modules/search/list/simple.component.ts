import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'm-search--simple-list',
  templateUrl: 'simple.component.html'
})
export class SearchSimpleListComponent {
  @Input() entities: any[] = [];
  @Output() seeAll: EventEmitter<any> = new EventEmitter();

  searchType(type: string) {
    this.seeAll.emit(type);
  }
}
