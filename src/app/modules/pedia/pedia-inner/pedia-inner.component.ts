import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedia-inner',
  templateUrl: './pedia-inner.component.html',
  styleUrls: ['./pedia-inner.component.scss']
})
export class PediaInnerComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('curreny route tree',this.route)
    this.route.params.subscribe(params => {
      console.log('params',params['info']);
      if(params['info']){
        
      }
    })
  }

}
