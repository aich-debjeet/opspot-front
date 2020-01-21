import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopbarHashtagsService } from './service/topbar.service';
import { Client } from '../../services/api/client';

@Component({
    selector:'app-skills',
    template:`
    <tag-input   [maxItems]=maxItems required
      style="border:1px solid #959595; padding-bottom: 50px;" [(ngModel)]='inputTagsValue' [addOnBlur]="true"
      (ngModelChange)=inputTagsValueChange.emit(inputTagsValue)  name="skills" theme='minimal'>
         <tag-input-dropdown [showDropdownIfEmpty]="true" [minimumTextLength]=5 [autocompleteItems]="data">
           </tag-input-dropdown>
    </tag-input>
   `    
})


export class SkillsTag implements OnInit{
    
    
   @Input()maxItems;
   @Input()inputTagsValue:any;
   @Output()inputTagsValueChange:EventEmitter<any>=new EventEmitter()
   data:any=[]
   
   constructor(private service:TopbarHashtagsService ,private client:Client){
   this.load()
   }


   ngOnInit(){

    }

    async load(){
        let res=await this.service.load(50)
        res.map(a=>{
          this.data.push(a.value)
        })
    }
}