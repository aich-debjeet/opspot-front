import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

import { Client } from '../../../../services/api/client';
// import { Session } from '../../../../services/session';

@Component({
  selector: 'm-wallet-token--chart',
  templateUrl: 'chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletTokenContributionsChartComponent implements OnInit {
  rewards: any[];
  sampleObj:{}= {"comments": 4, "reminds": 4,"votes": 2,"subscribers": 4,"referrals": 50,"checkin": 2,"signup": 1.575,"profile": 0.7875};
  
  constructor(
    protected client: Client
  ) { }
  
  ngOnInit() {
    this.load();
  }
  
  load() {
    this.client.get('api/v3/rewards/data').then((result: any) => {
      // this.prepare(result.entities);
      if (result.entities) {
        this.rewards = result.entities;
        console.log(this.rewards);
        // this.convertToObj(this.rewards);
      }
    });
  }
  convertToObj(array:any){
    console.log(array);
    for (var i = 0; i < array.length; i++) {
      this.sampleObj[array[i]] = array[i].value;
    }
    console.log('the refined object is',this.sampleObj);
  }

  // prepare(entities) {
  //   for (var i = 0; i < entities.length; i++) {
  //     this.rewards[entities[i].key] = entities[i].value;
  //   }
  //   console.log('after', this.rewards);
  // }
}
