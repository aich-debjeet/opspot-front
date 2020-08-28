import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { InnerPediaService } from '../../../services/inner-pedia.service';

@Component({
  selector: 'app-pedia-inner',
  templateUrl: './pedia-inner.component.html',
  styleUrls: ['./pedia-inner.component.scss']
})
export class PediaInnerComponent implements OnInit {
  props: string = "descriptions|info|sitelinks";
  uniqId: string = '';
  htmlToAdd: any;
  // wikiApi = `https://www.wikidata.org/w/api.php`;
  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    private pediaService: InnerPediaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('params', params['info']);
      if (params['info']) {
        this.uniqId = params['info'];
        this.getDetails(this.uniqId);
      }
    })
  }

  async getDetails(id: string) {
    try {
      const response = await this.pediaService.get('', {
        action: 'wbgetentities',
        sites: 'enwiki',
        ids: id,
        props: this.props,
        languages: 'en',
        format: 'json'
      });
      this.htmlToAdd = response;
      console.log('response', response)
    }
    catch (e) {
      console.log('error', e)
    }
  }

}
