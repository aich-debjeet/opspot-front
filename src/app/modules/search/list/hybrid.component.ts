import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HybridSearchEntities } from '../search.component';

@Component({
  moduleId: module.id,
  selector: 'm-search--hybrid-list',
  templateUrl: 'hybrid.component.html'
})
export class SearchHybridListComponent {
  @Input() entities: HybridSearchEntities;
  @Output() seeAll: EventEmitter<any> = new EventEmitter();

  searchType(type: string) {
    this.seeAll.emit(type);
  }
}
