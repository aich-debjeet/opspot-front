import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  
  config;
  constructor(private cd :ChangeDetectorRef) {
   if(window.innerWidth<800){
    this.config={
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    }
   }else{
    this.config={
      slidesPerView: 8,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    }

   }

   }
  
  ngOnInit() {
  }

}
