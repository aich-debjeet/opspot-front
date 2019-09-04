import { Component, OnInit } from '@angular/core';
import { TopbarHashtagsService } from '../hashtags/service/topbar.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  hashtags:[];

  constructor(
    public service: TopbarHashtagsService,
  ) { }

  async ngOnInit() {
    await this.load();
  }

  async load(){
    try{
      this.hashtags = await this.service.load(16);
      console.log(this.hashtags);
    } catch(e){
      console.log(e);
    }
  }
  switchSearchType(sType: string){}

  switchCategoryType(sType: string){}

  triggerSearchApi(){}
}
