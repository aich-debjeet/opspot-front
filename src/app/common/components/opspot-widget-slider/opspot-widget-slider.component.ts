import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../services/api/client';
import { Storage } from '../../../services/storage';

@Component({
  selector: 'opspot-widget-slider',
  templateUrl: 'opspot-widget-slider.component.html'
})
export class OpspotWidgetSliderComponent implements OnInit {
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: true
  };

  @Input() title: any;

  opspot = window.Opspot;
  suggestions: Array<any> = [];
  lastOffset = 0;
  inProgress = false;

  constructor(private client: Client, private storage: Storage) {}

  ngOnInit() {
    this.load();
    console.log(this.suggestions);
  }

  async load() {
    this.inProgress = true;
    let limit = 4;

    if (this.suggestions.length) {
      limit = 1;
    }

    this.lastOffset = this.suggestions.length ? this.lastOffset + 11 : 0;

    try {
      let response: any = await this.client.get('api/v2/suggestions/user', {
        limit,
        offset: this.lastOffset
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
    this.storage.set(
      `user:suggestion:${suggestion.entity_guid}:removed`,
      suggestion.entity_guid
    );
    await this.client.put(`api/v2/suggestions/pass/${suggestion.entity_guid}`);
    // load more
    this.load();
  }

  remove(suggestion) {
    this.suggestions.splice(this.suggestions.indexOf(suggestion), 1);
    this.storage.set(
      `user:suggestion:${suggestion.entity_guid}:removed`,
      suggestion.entity_guid
    );
    // load more
    this.load();
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }
}
