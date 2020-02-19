import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../services/api/client';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-enrolment-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./../enrolment.component.scss']
})
export class EnrolmentInvoiceComponent implements OnInit {
  paramsSubscription: Subscription;
  enrolledData: any;
  constructor(public route: ActivatedRoute, public client: Client) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.client.get(`api/v3/campaign/enrolment/${params['campaignGuid']}/${params['enrollGuid']}`)
      .then((data:any)=>{
        // console.log(data)
        this.enrolledData = data.enrolment; 
      })
      .catch((e)=>{
        // console.log(e);
      })
    })
  }
  print() {
    window.print();
  }
}
