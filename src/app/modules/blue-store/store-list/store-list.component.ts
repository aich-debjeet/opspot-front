import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../services/api/client';
  


@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  userGuid= window.Opspot.user.guid;
  category: string;
  market: string;
  cards: Object[]=[];
  offset: string= '';
  limit = 10;

  @Output() off: EventEmitter<any> = new EventEmitter();
  constructor(private route: ActivatedRoute,
    private client: Client) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('params', params);
      this.category = params['category_name'];
      this.market = params['type'];
      this.offset = params['offset'] ? params['offset']: ''
      
      // if(params['offset']){
      //   this.offset = params['offset'];
      // } else this.offset='';

      if(params['type'] == 'My Sales Board'){
        this.loadSales();
      } else {
        this.load()
      }

    })
  }

  load(){
    this.client.get('api/v3/marketplace/category',{category_name:this.category, limit: this.limit, offset:this.offset}).then(response => {
      console.log('response', response);
      if(response['activity']){
        this.cards.push(...response['activity']) ;          
      }
      if(response['load-next']){
        this.off.emit(response['load-next'])
      } else {
        this.off.emit('')
      }

      
    })
    
  }

  loadSales(){
    this.client.get(`api/v3/marketplace/single/${this.userGuid}`,{limit: this.limit, offset:this.offset}).then(response => {
      console.log('response', response);
      if(response['activity']){
        this.cards.push(...response['activity']) ;          
      }
      if(response['load-next']){
        this.off.emit(response['load-next'])
      } else {
        this.off.emit('')
      }

      
    })
  }

}
