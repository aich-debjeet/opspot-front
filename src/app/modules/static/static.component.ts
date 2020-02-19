import { Component, OnInit } from '@angular/core';
import { OpspotTitle } from '../../services/ux/title';

@Component({
  selector: 'app-static',
  templateUrl: 'static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {

  constructor(
    private title: OpspotTitle
  ) { }

  ngOnInit() {
    this.title.setTitle('Static');
  }

}
