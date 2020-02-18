import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'opspot-search-filter',
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent implements OnInit {

  selectedFilter = '';
  @Input() options: any[] = [];
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  onFilterChange(option: string) {
    this.selectedFilter = option;
    this.selected.emit(this.selectedFilter);
  }

}
