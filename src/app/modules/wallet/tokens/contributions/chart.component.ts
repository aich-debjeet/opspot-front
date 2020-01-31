import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

import { Client } from '../../../../services/api/client';
// import { Session } from '../../../../services/session';

@Component({
  selector: 'm-wallet-token--chart',
  inputs:['_setRewards:rewards'],
  templateUrl: 'chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletTokenContributionsChartComponent implements OnInit {
  rewards: any;
  display: boolean =false;
  constructor(
    protected client: Client
  ) {
   }
  
  ngOnInit() {
  }

  set _setRewards(value: any) {
    this.rewards = value;
  }
}
