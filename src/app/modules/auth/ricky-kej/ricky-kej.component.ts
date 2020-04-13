import { Component, OnInit, AfterContentInit } from '@angular/core';
import { OverlayModalService } from '../../../services/ux/overlay-modal'
import { BrodcastComponent } from './brodcast/brodcast.component';

@Component({
  selector: 'app-ricky-kej',
  templateUrl: './ricky-kej.component.html',
  styleUrls: ['./ricky-kej.component.scss']
})
export class RickyKejComponent implements OnInit, AfterContentInit {
  tab: string ='home';
  opened: boolean = false;
  constructor(
    private overlayModal: OverlayModalService
  ) { }

  ngOnInit() {
  }

  scrollToElement($element, s:string): void {
    this.tab= s;
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  ngAfterContentInit() {
    (() => {
      let nav = document.getElementById('top-menu');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 1.5) {
          nav.classList.add("sticky");
        } else {
          nav.classList.remove("sticky");
        }
      });
    })()
  }
  open(){
    this.overlayModal.create(BrodcastComponent,{},{
      class: 'm-overlay-modal--brodcast-time',
    }).present();
  }
}
