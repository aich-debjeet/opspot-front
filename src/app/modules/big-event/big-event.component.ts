import { Component, OnInit } from '@angular/core';
import { EVENT_TYPES,EVENT_CATEGORY } from '../../services/list-options';

@Component({
  selector: 'app-big-event',
  templateUrl: './big-event.component.html',
  styleUrls: ['./big-event.component.scss']
})
export class BigEventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  eventTypeList = EVENT_TYPES;
  eventCategory = EVENT_CATEGORY;


}
