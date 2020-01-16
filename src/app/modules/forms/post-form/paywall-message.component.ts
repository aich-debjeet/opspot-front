import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paywall-message',
  inputs: ['opts'],
  templateUrl: './paywall-message.component.html'
})
export class PaywallMessageComponent implements OnInit {

  coins: string;
  message: any;

  _opts: any;
  set opts(opts: any) {
    this._opts = opts;
  }

  constructor() { }

  ngOnInit() {
  }

  add() {
    if (this._opts && this._opts.onSelected) {
      this._opts.onSelected({
        coins: this.coins,
        message: this.message
      });
    }
  }

}
