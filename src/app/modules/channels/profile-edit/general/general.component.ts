import { Component, OnInit } from '@angular/core';
import { TopbarHashtagsService } from  '../../../hashtags/service/topbar.service';
import { Client } from '../../../../services/api/client';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(private service:TopbarHashtagsService ,private client:Client) {
    this.load()
   }
 
   model: any = {};


 onSubmit(){
   console.log(this.model)
 }
 

 async load(){
      let res=await this.service.load(50)
      res.map(a=>{
        this.data.push(a.value)
      })
  }
  async getInfo(){
   let res=await this.client.get('api/v1/channel/me')
   console.log(res)
  }

  ngOnInit() {
    this.getInfo()

    
  }
 items;
 data=[]
}
