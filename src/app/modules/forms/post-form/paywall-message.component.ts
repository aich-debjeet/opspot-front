import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-paywall-message',
  inputs: ['opts'],
  templateUrl: './paywall-message.component.html'
})
export class PaywallMessageComponent implements OnInit {

  coins: number;
  message: any;

  _opts: any;
  set opts(opts: any) {
    this._opts = opts;
  }

  @Input('object') set data(object) {
    this.coins = object ? object.coins : null;
    this.message = object ? object.message : null;
  }

  // @Output() closed: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  add() {
    if (this._opts && this._opts.onSelected) {
      this._opts.onSelected({
        coins: this.coins.toString(),
        message: this.message
      });
    }
    // this.closed.emit();
  }

  limit(e) {
    let max_chars = 3;

    if (e.target.value.length >= max_chars) {
      e.preventDefault();
    }
  }

}
