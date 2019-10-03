import { Component, OnInit } from '@angular/core';
import { TopbarHashtagsService } from  '../../../hashtags/service/topbar.service';
import { Client } from '../../../../services/api/client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(private service:TopbarHashtagsService ,private client:Client,private router:Router) {
    this.load()
   }
 
   model: any = {};
  

 onSubmit(){
   let skills=this.model.skills.map(el=>el.value)
   let info={
     fullName:this.model.fullName,  
     skills
   }
    this.sendInfo(info)
 }

 sendInfo(data){
   let info={"general_info":{
     "full_name":data.fullName,
     "skills":data.skills
   }}
  this.client.post('api/v1/entities/general_info' ,info).then(res=>{
    this.router.navigate(['/profile_edit/about'])
  })
 }
 

 async load(){
      let res=await this.service.load(50)
      res.map(a=>{
        this.data.push(a.value)
      })
  }
  async getInfo(){
   let res=await this.client.get('api/v1/channel/me')
   this.model.fullName=res['channel'].name
     if(res['channel'].general_info.skills.length>0){
        let skills=[];
        res['channel'].general_info.skills.map(el=>{skills.push({display:el,value:el})})
        this.model.skills=skills;
     }
    
  }

  ngOnInit() {
    this.getInfo()

    
  }
 data=[]
}
