import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../services/api/client';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { SpotcoinsComponent } from '../../blockchain/marketing/spotcoins/spotcoins.component';


@Component({
  moduleId: module.id,
  selector: 'm-wallet--tokens',
  templateUrl: 'tokens.component.html'
}) 
export class WalletTokensComponent implements OnInit {

  showOnboarding: boolean = false;
  opspot = window.Opspot;
  showTokenOptions: boolean = false;


  
  constructor(route: ActivatedRoute, protected client: Client,protected cd: ChangeDetectorRef,private overlayModal: OverlayModalService,) {
    route.url.subscribe(() => {
      this.showOnboarding = route.snapshot.firstChild && route.snapshot.firstChild.routeConfig.path === 'transactions';
    });
  }
  
  overview = {
    nextPayout: null,
  }
 protected updateTimer$;
  ngOnInit(){
    this.load();
    this.updateTimer$ = setInterval(this.updateNextPayout.bind(this), 1000);

  }

  async load() {
    try {
      const result: any = await this.client.get(`api/v2/blockchain/contributions/overview`);
      this.overview.nextPayout = result.nextPayout;
      this.detectChanges();
    } catch (e) {
      console.error(e);
    }
  }
  
   detectChanges(){
    this.cd.markForCheck(); 
    this.cd.detectChanges();
   }
 
   updateNextPayout(){
    if (this.overview.nextPayout) {
      this.overview.nextPayout--;
      this.detectChanges();
    }
   }

   buyTokens() {
    // this.overlayService.dismiss();
    // this.router.navigate(['/token']);
    const tokenModal = this.overlayModal.create(SpotcoinsComponent,'',  { class: 'modalChanger' });

    tokenModal.onDidDismiss(() => {
      this.showTokenOptions = false;
    });
    tokenModal.present();
  }

}
