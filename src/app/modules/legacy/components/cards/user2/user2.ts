import { Component, OnInit } from '@angular/core';

import { Session } from '../../../../../services/session';
import { Client } from '../../../../../services/api';
import { Storage } from '../../../../../services/storage';


@Component({
  selector: 'opspot-card-user2',
  templateUrl: 'user2.html',
  styleUrls: ['./user2.scss']
})

export class UserCard2 implements OnInit {
 
   slideConfig = {
     slidesToShow: 3,
     slidesToScroll: 1,
     infinite: false,
     arrows: true,
   };
 
   opspot = window.Opspot;
   suggestions: Array<any> = [];
   lastOffset = 0;
   inProgress: boolean = false;
 
   constructor(
     private client: Client,
     private storage:Storage){}
 
   ngOnInit() {
     this.load();
     console.log(this.suggestions)
   }
 
   async load() {
     this.inProgress = true;
     let limit: number = 4;
 
     if (this.suggestions.length)
       limit = 1;
 
     this.lastOffset = this.suggestions.length ? this.lastOffset + 11 : 0;
 
     try {
       let response: any = await this.client.get('api/v2/suggestions/user', {
         limit,
         offset: this.lastOffset,
       });
       for (let suggestion of response.suggestions) {
         this.suggestions.push(suggestion);
       }
     } catch (err) {
     } finally {
       this.inProgress = false;
     }
   }
 
   async pass(suggestion, e) {
     e.preventDefault();
     e.stopPropagation();
     this.suggestions.splice(this.suggestions.indexOf(suggestion), 1);
     this.storage.set(
       `user:suggestion:${suggestion.entity_guid}:removed`,
       suggestion.entity_guid
     );
     await this.client.put(`api/v2/suggestions/pass/${suggestion.entity_guid}`)
     // load more
     this.load();
   }
 
   remove(suggestion) {
     this.suggestions.splice(this.suggestions.indexOf(suggestion), 1);
      this.storage.set(
       `user:suggestion:${suggestion.entity_guid}:removed`,
       suggestion.entity_guid
     );
     // load more
     this.load();
   }
 
   slickInit(e) {
     console.log('slick initialized');
   }
 
   breakpoint(e) {
     console.log('breakpoint');
   }
 
   afterChange(e) {
     console.log('afterChange');
   }
 
   beforeChange(e) {
     console.log('beforeChange');
   }
 
 
}
