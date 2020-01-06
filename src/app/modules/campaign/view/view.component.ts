import { Component, OnInit } from '@angular/core';
import { Client } from '../../../services/api/client';
import { Router } from '@angular/router';
import { OpspotTitle } from '../../../services/ux/title';

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
    public router: Router,
    public title: OpspotTitle
  ) { }

  ngOnInit() {
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

  enrolled() {
    this.router.navigate(['/campaign/invoice']);
  }

}
