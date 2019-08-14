import { Component, OnInit } from '@angular/core';
import { Client } from '../../../services/api/client';

@Component({
  selector: 'app-bookmark-view',
  templateUrl: './bookmark-view.component.html',
  styleUrls: ['./bookmark-view.component.scss']
})
export class BookmarkViewComponent implements OnInit {

  constructor(
    private client:Client
  ) { }

  activity:any=[];
  
  ngOnInit() {
   this.load()
   console.log(this.activity)
  }

   async load(){
     this.client.get('api/v3/bookmark',{
       limit:5,
       offset:''
     } ).then(res=>{
       if(res['entities']){
       this.activity=res['entities']
       }
      })
   }
}
