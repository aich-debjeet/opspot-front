import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
defaultOption: string;
moreData: boolean = true;
inProgress: boolean = false;
offset: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.defaultOption = 'BlueStore'
  }

  ngOnInit() {
  }

  changeMarketType(type: string){
    this.defaultOption = type;
  }

  onActivate(event){
    console.log(event);
    event.off.subscribe((data)=> {
      console.log(data);
      if(data){
        this.offset = data;
      } else this.offset = '';
      
    })
  }
  load(){
    console.log('loading');
    this.router.navigate([],{ queryParams: { offset: this.offset }, queryParamsHandling: 'merge' })
    
  }

}
