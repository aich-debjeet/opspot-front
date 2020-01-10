import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Client } from '../../../services/api/client';
import { OpspotTitle } from '../../../services/ux/title';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-enrolment-view',
  templateUrl: './view.component.html',
  styleUrls: ['./../enrolment.component.scss']
})
export class EnrolmentViewComponent implements OnInit {

  inProgress: boolean = false;
  enrolmentDetails: any;
  formData: any;

  constructor(
    public client: Client,
    public router: Router,
    public title: OpspotTitle,
    private http: HttpClient,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    const location = window.location.href;
    // if(location.split("?").length == 2){
    //   this.confirming = false;
    //   this.confirmed = true;
    //   this.showPledgeModal =true;
    // }
    const a = document.createElement('script');
    a.src = 'https://js.instamojo.com/v1/checkout.js';
    this.elementRef.nativeElement.appendChild(a);
    this.load();
    this.title.setTitle('Enrolment');
  }

  load() {
    if (this.inProgress)
      return false;

    this.inProgress = true;

    this.client.get('api/v3/campaign/enrolment')
      .then((data: any) => {
        this.enrolmentDetails = data;
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  proceedPayment(formData: any) {
    this.formData = formData;
    this.payment();
  }

  loadInvoice() {
    this.router.navigate(['/campaign/invoice']);
  }

  payment() {
    const formData = new FormData();
    formData.append('amount', environment.campaigns.enrolment.fee.amount.toString());
    formData.append('purpose', environment.campaigns.enrolment.fee.purpose);
    formData.append('buyer_name', this.formData.fullname);
    formData.append('email', this.formData.email);
    formData.append('phone', this.formData.phone_no);
    formData.append('redirect_url', window.Opspot.site_url + 'campaign/invoice');

    this.http.post<any>('api/v3/payment/instamojo', formData).subscribe(
      (res) => {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.innerHTML = "Instamojo.open('" + res.longurl + "');";
        this.elementRef.nativeElement.appendChild(s);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
