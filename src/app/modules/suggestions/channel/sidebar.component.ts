import { Component } from '@angular/core';
import { Client } from '../../../services/api';

@Component({
  selector: 'm-suggestions__sidebar',
  templateUrl: 'sidebar.component.html'
})

export class SuggestionsSidebar {

  opspot = window.Opspot;
  suggestions: Array<any> = [];
  lastOffset = 0;
  inProgress: boolean = false;

  constructor(
    private client: Client,
  ) {
  }

  ngOnInit() {
    this.load();
    // console.log(this.suggestions)
  }

  async load() {
    this.inProgress = true;
    let limit: number = 4;

    if (this.suggestions.length)
      limit = 1;

    // Subscribe can not rely on next batch, so load further batch
    this.lastOffset = this.suggestions.length ? this.lastOffset + 11 : 0;

    try {
      let response: any = await this.client.get('api/v2/suggestions/user', { 
        limit,
        offset: this.lastOffset,
      });
      for (let suggestion of response.suggestions) {
        this.suggestions.push(suggestion);
      }
    } catch (err) {
    } finally {
      this.inProgress = false;
    }
  }

  async pass(suggestion, e) {
    e.preventDefault();
    e.stopPropagation();
    this.suggestions.splice(this.suggestions.indexOf(suggestion), 1);
    await this.client.put(`api/v2/suggestions/pass/${suggestion.entity_guid}`);

    // load more
    this.load();
  }

  remove(suggestion) {
    this.suggestions.splice(this.suggestions.indexOf(suggestion), 1);

    // load more
    this.load();
  }

}
