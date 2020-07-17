import { Component } from '@angular/core';
import { Client } from '../../../services/api';
import {remove as _remove} from 'lodash';

@Component({
  selector: 'm-suggestions__slider',
  templateUrl: 'slider.component.html'
})
export class SuggestionsSlider {
  opspot = window.Opspot;
  suggestions: Array<any> = [];
  lastOffset = 0;
  inProgress: boolean = false;

  constructor(private client: Client) {}

  ngOnInit() {
    this.load();
  }

  slideConfig = {
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow:1,
          slidesToScroll: 1
        }
      }
    ]
  }

  async load() {
    this.inProgress = true;
    let limit: number = 10;

    if (this.suggestions.length) {
      limit = 1;
    }

    // Subscribe can not rely on next batch, so load further batch
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

  async pass(suggestion) {
    // e.preventDefault();
    // e.stopPropagation();
    this.suggestions = _remove(this.suggestions, function (n) {
      return n.entity_guid !== suggestion.guid;
    });
    await this.client.put(`api/v2/suggestions/pass/${suggestion.guid}`);

    // load more
    this.load();
  }

  // remove(suggestion) {
  //   console.log("suggestion", suggestion);
    
  //   // this.suggestions.splice(this.suggestions.indexOf(suggestion.guid), 1);
  //   this.suggestions = _remove(this.suggestions, function (n) {
  //       return n.entity_guid !== suggestion.guid;
  //     });
  //   // load more
  //   // this.load();
  // }
}
