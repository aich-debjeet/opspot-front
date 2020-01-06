import { Component, OnInit } from '@angular/core';
import { Client } from '../../../services/api/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolment-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class EnrolmentViewComponent implements OnInit {

  inProgress: boolean = false;
  enrolmentDetails: any;

  constructor(
    public client: Client,
    public router: Router
  ) { }

  ngOnInit() {
    this.load();
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

  enrolled() {
    this.router.navigate(['/campaign/invoice']);
  }

}
