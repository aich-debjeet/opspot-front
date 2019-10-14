import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'opspot-search-filter',
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent implements OnInit {

  @Input() options: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
