import { Component, OnInit } from '@angular/core';
import { Client } from '../../../services/api/client';

@Component({
  selector: 'app-bookmark-view',
  templateUrl: './bookmark-view.component.html',
  styleUrls: ['./bookmark-view.component.scss']
})
export class BookmarkViewComponent implements OnInit {

  _filter: string = 'all';
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;

  constructor(
    private client:Client
  ) { }

  activity:any=[];
  
  ngOnInit() {
   this.load(true)
   console.log(this.activity)
  }
  changeFilter(filter: string) {
    this._filter = filter;
    this.activity = [];
    this.load(true);
}

   async load(refresh: boolean = false){
    if (this.inProgress) return false;

    if (refresh)
      this.offset = '';

    this.inProgress = true;
     this.client.get('api/v3/bookmark/'+ this._filter,{
       limit:10,
       offset:this.offset
     } ).then(res=>{
      //  if(res['entities']){
      //  this.activity=res['entities']
      //  }
       if (!res['entities']) {
        this.moreData = false;
        this.inProgress = false;
        return false;
      }

      if (refresh) {
        this.activity = res['entities'];
      } else {
        for (let entity of res['entities'])
        this.activity.push(entity);
      }

      if (!res['load-next'])
        this.moreData = false;
      this.offset = res['load-next'];
      this.inProgress = false;
      })
   }
}
