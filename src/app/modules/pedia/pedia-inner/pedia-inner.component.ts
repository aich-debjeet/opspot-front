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
  props: string = "aliases|claims|datatype|descriptions|info|labels|sitelinks";
  uniqId: string = '';
  htmlToAdd: any;
  title: string;
  desc: string;
  detailedDesc: any;
  imgStr: string;
  // wikiApi = `https://www.wikidata.org/w/api.php`;
  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    private pediaService: InnerPediaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('params', params['info']);
      if (params['info'] && params['title']) {
        this.title = params['title']
        this.uniqId = params['info'];
        this.getDetails(this.uniqId).then(()=> this.getDetailsWiki(this.title));
      }
    })
  }

  async getDetails(id: string) {
    try {
      const response = await this.pediaService.get('wikidata', {
        action: 'wbgetentities',
        sites: 'enwiki',
        ids: id,
        props: this.props,
        languages: 'en',
        format: 'json'
      });
      this.desc = response['data']['entities'][id]['descriptions']['en']['value'];
      if(response['data']['entities'][id]['claims']['P18']){
        this.imgStr = response['data']['entities'][id]['claims']['P18'][0]['mainsnak']['datavalue'].value.split(' ').join('_');
      }
    }
    catch (e) {
      if(this.desc)
      this.desc='';
    }
  }

  async getDetailsWiki(title: string){
    try {
      const response = await this.pediaService.get('wikidata', {
        action: 'query',
        list: 'search',
        srsearch: title,
        format: 'json'
      });
      if(response['data']['query']['search']){
        this.detailedDesc = response['data']['query']['search'];
      }
    }
    catch (e) {
      if(this.desc)
      this.desc='';
    }
  }
}
