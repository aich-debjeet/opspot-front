import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-noti-filter',
  templateUrl: './noti-filter.component.html',
  styleUrls: ['./noti-filter.component.scss']
})
export class NotiFilterComponent implements OnInit {

  @Output('changeFilter') changeFilte: EventEmitter<any> = new EventEmitter();
  _filter: string;

  @Input('defaultFilter') set _defaultFilter(value: any){
    console.log(value);
    this._filter =  value;
  }
  @Input('object') set data(object) {
    console.log(object)
    this._filter = object;
  }
  _opts: any;
  set opts(opts: any) {
    console.log(opts)
    this._opts = opts;
  }
  constructor() { }

  ngOnInit() {
  }

  changeFilter(filter: string) {
    console.log('filter',filter)
    this.changeFilte.emit(filter);

    if (this._opts && this._opts.onUpdate) {
      this._opts.onUpdate(filter);
    }
  }
}
