import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-pedia-inner',
  templateUrl: './pedia-inner.component.html',
  styleUrls: ['./pedia-inner.component.scss']
})
export class PediaInnerComponent implements OnInit {
  props: string ="descriptions|info|sitelinks";
  uniqId: string ='';
  wikiApi = `https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&ids=Q127369&props=${this.props}&languages=en&format=json`;
  constructor(
    private route: ActivatedRoute,
    public http: HttpClient
  ) { }

  ngOnInit() {
    console.log('curreny route tree',this.route)
    this.route.params.subscribe(params => {
      console.log('params',params['info']);
      if(params['info']){
        this.uniqId = params['info'];
        this.getDetails();
      }
    })
  }
  getDetails(){
    this.http.get(this.wikiApi)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }

}
