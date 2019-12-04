import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Client } from '../../../../services/api/client';
import { OpspotTitle } from '../../../../services/ux/title';
import { WireCreatorComponent } from '../../../wire/creator/creator.component';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';
import { BlockchainTdeBuyComponent } from '../../tde-buy/tde-buy.component';
import { Session } from '../../../../services/session';
import { Web3WalletService } from '../../web3-wallet.service';
import { TokenDistributionEventService } from '../../contracts/token-distribution-event.service';
import * as BN from 'bn.js';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-spotcoins',
  templateUrl: './spotcoins.component.html',
  styleUrls: ['./spotcoins.component.scss']
})
export class SpotcoinsComponent implements OnInit {

  stats: { amount, count, requested, issued } = {
    amount: 0,
    count: 0,
    requested: 0,
    issued: 0,
  };

  //amount: number = 0.25;
  tokens: number = 1;
  address: string = '';
  ofac: boolean = false;
  use: boolean = false;
  terms: boolean = false;

  autodetectedWallet: boolean | null = null;

  opspot = window.Opspot;
  showPledgeModal: boolean = false;
  showLoginModal: boolean = false;
  confirming: boolean = false;
  confirmed: boolean = false;
  error: string;

  @ViewChild('tokenInputField') tokenInput:ElementRef;

  @Input() phase: string = 'presale';
  inProgress: boolean = false;
  rate: number = 1/87.5;    //change the rate to display the value of tokens

  constructor(
    protected client: Client,
    private elementRef: ElementRef,
    protected changeDetectorRef: ChangeDetectorRef,
    protected title: OpspotTitle,
    protected overlayModal: OverlayModalService,
    protected web3Wallet: Web3WalletService,
    protected tde: TokenDistributionEventService,
    public session: Session,
    public http: HttpClient) {
    this.loadScript();
  }

  ngOnInit() {
    // this.loadWalletAddress();
    //this.loadScript();
  }

  get amount() {
    let newAmnt = this.tokens / this.rate;
    let wei = 10 ** 18;
    return Math.ceil(newAmnt * wei) / wei; // Rounds up amount and add 1/1000th ETH to compensate for rounding
  }

  set amount(value: number) {
    console.log(value)
    this.tokens = value * this.rate;
  }

  async load() {
    this.inProgress = true;
    this.detectChanges();

    try {
      const response: any = await this.client.get('api/v2/blockchain/purchase');
      this.stats = {
        amount: response.amount,
        count: response.count,
        requested: response.requested,
        issued: response.issued,
      };
      // this.rate = response.rate;
      //this.amount = this.stats.pledged;
    } catch (e) { }

    this.inProgress = false;
    this.detectChanges();
  }

  async loadWalletAddress() {
    const address = await this.web3Wallet.getCurrentWallet();
    this.address = address ? address : '';
    this.autodetectedWallet = !!this.address;
    this.detectChanges();
  }

  //on purchase this method was originally called.
  async purchase() {
    await this.load();
    if (this.session.isLoggedIn()) {
      this.showPledgeModal = true;
    } else {
      this.showLoginModal = true;
    }
    this.detectChanges();
  }

  canConfirm() {
    return this.amount > 0 && this.ofac && this.use && this.terms;
  }

  async confirm() {
    alert('confirm');
    this.confirming = true;
    this.detectChanges();

    let tx, amount;

    try {
      let comp = 0.000000000000000001;
      amount = parseFloat((this.amount + comp).toFixed(18)); // Allow for small rounding discrepencies caused by recurring decimals
      tx = await this.tde.buy(amount, this.rate);
    } catch (err) {
      this.error = err;
      this.confirming = false;
      this.detectChanges();
      return;
    }

    let response = await this.client.post('api/v2/blockchain/purchase', {
      tx: tx,
      amount: amount.toString(),
      wallet_address: await this.web3Wallet.getCurrentWallet()
    });

    this.confirming = false;
    this.confirmed = true;
    this.detectChanges();

    /*setTimeout(() => {
      this.closePledgeModal();
      this.confirmed = false;
    }, 2000);*/
  }

  closeLoginModal() {
    this.showPledgeModal = true;
    this.showLoginModal = false;
    this.detectChanges();
  }

  closePledgeModal() {
    this.showPledgeModal = false;
    this.detectChanges();
  }

  promptTokenInput(input) {
    alert('Please enter how many tokens you wish to purchase');
    setTimeout(() => { input.focus() }, 100);
  }

  detectChanges() {
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  loadScript() {
    const location = window.location.href;
    if (location.split("?").length == 2) {
      this.confirming = false;
      this.confirmed = true;
      this.showPledgeModal = true;
    }
    const a = document.createElement('script');
    a.src = 'https://js.instamojo.com/v1/checkout.js';
    this.elementRef.nativeElement.appendChild(a);
  }
  onSubmit() {

  }
  payment() {
    if(Number(this.tokenInput.nativeElement.value) < 1 || Number(this.tokenInput.nativeElement.value) > 99){
      alert('You can enter coins within the range of 1 to 99');
      return;
    }
    const formData = new FormData();
    formData.append('amount', this.amount.toString());
    formData.append('purpose', 'token_purchase');
    formData.append('buyer_name', window.Opspot.user.name);
    //formData.append('redirect_url','https://336a201c.ngrok.io/Instamojo-php-curl/success');
    formData.append('email', window.Opspot.user.email);
    formData.append('phone', window.Opspot.user.phone);


    this.http.post<any>('api/v3/payment/instamojo', formData).subscribe(
      (res) => {
        const s = document.createElement('script');

        s.type = 'text/javascript';
        s.innerHTML = "Instamojo.open('" + res.longurl + "');";


        this.elementRef.nativeElement.appendChild(s);
      },
      (err) => console.log(err)
    );
  }

}
