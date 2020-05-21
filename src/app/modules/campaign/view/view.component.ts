import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  enrollmentDetails: any;
  eventGuid: string;
  private sub: any;

  constructor(
    public client: Client,
    public router: Router,
    private route: ActivatedRoute,
    public title: OpspotTitle,
    private http: HttpClient,
    private elementRef: ElementRef
  ) {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      if (params['guid']) {
        this.loadDetails(params['guid']);
      }
    });
    console.log(this.route);

  }

  loadDetails(guid: string) {
    this.client.get('api/v3/event/' + guid)
      .then((response: any) => {
        console.log(response);
        if (response.status == 'success' && response['event']) {
          console.log(response['event']);
          this.enrolmentDetails = response['event'];
        }
      });
  }
  ngOnInit() {
    const location = window.location.href;
    const a = document.createElement('script');
    a.src = 'https://js.instamojo.com/v1/checkout.js';
    this.elementRef.nativeElement.appendChild(a);
    // this.load();
    this.title.setTitle('Enrolment');
  }

  load() {
    if (this.inProgress)
      return false;

    this.inProgress = true;

    this.client.get('api/v3/campaign/enrolment')
      .then((data: any) => {
        // console.log('campaign dta',data)
        this.enrolmentDetails = data;
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }

  proceedPayment(enrollDetails: any) {
    console.log('form data =', enrollDetails);
    this.enrollmentDetails = enrollDetails;
    this.formData = this.enrollmentDetails.form;
    this.payment();
  }

  loadInvoice() {
    this.router.navigate(['/campaign/invoice']);
  }

  payment() {
    // const formData = new FormData();
    // formData.append('amount', environment.campaigns.enrolment.fee.amount.toString());
    // formData.append('purpose', 'enrollment');
    // formData.append('buyer_name', this.formData.fullname);
    // formData.append('email', this.formData.email);
    // formData.append('phone', this.formData.phone_no);
    // formData.append('redirect_url', window.Opspot.site_url + 'campaign/invoice/'+ this.enrollmentDetails.campaignGuid + '/' + this.enrollmentDetails.enrollGuid);
    // formData.append('purpose_guid', this.enrollmentDetails.enrollGuid);

    // this.http.post<any>('api/v3/payment/instamojo', formData).subscribe(
    //   (res) => {
    //     const s = document.createElement('script');
    //     s.type = 'text/javascript';
    //     s.innerHTML = "Instamojo.open('" + res.longurl + "');";
    //     this.elementRef.nativeElement.appendChild(s);
    //   }, (err) => {
    //     console.log(err);
    //   }
    // );

    const form_fees = environment.campaigns.enrolment.fee.amount;
    const total_amount = form_fees + (form_fees * 0.18) + (form_fees * 0.03);
    var formData = {
      'amount': total_amount.toString(),
      'purpose': 'enrollment',
      'buyer_name': this.formData.fullname,
      'email': this.formData.email,
      'phone': this.formData.phone_no,
      'redirect_url': window.Opspot.site_url + 'campaign/invoice/' + this.enrollmentDetails.campaignGuid + '/' + this.enrollmentDetails.enrollGuid,
      'purpose_guid': this.enrollmentDetails.enrollGuid,
      'custom_data': {
        'taxes': {
          'gst': '18%',
          'ops_service_fee': '3%'
        },
        'total_amount': total_amount.toString(),
      }
    }
    this.client.post('api/v3/payment/instamojo', formData
    )
      .then((res: any) => {
        console.log("Response: ", res);
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.innerHTML = "Instamojo.open('" + res.longurl + "');";
        this.elementRef.nativeElement.appendChild(s);
      })
      .catch((e) => {
        console.log(e);
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.innerHTML = "Instamojo.open('" + e.longurl + "');";
        this.elementRef.nativeElement.appendChild(s);
        // alert(e.message);
      });
  }

}
