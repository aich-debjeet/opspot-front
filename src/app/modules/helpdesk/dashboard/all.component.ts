import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../services/api/client';
import { Session } from '../../../services/session';

@Component({
  selector: 'm-helpdesk--dashboard--all',
  templateUrl: 'all.component.html',
  styleUrls:['./all.component.scss']
})

export class AllHelpdeskDashboardComponent implements OnInit {
  opspot = window.Opspot;

  questions = [];
  categories = [];

  constructor(
    public router: Router,
    public client: Client,
    public session: Session,
  ) {
  }

  async ngOnInit() {
    await this.load();
  }

  async load() {
    let response: any = await this.client.get(`api/v2/helpdesk/categories`, { limit: 5000 });
    this.categories = response.categories;

    response = await this.client.get(`api/v2/helpdesk/questions`, { limit: 5000 });
    this.questions = response.questions;

    for (let category of this.categories) {
      category.questions = this.questions
        .filter((question) => {
          return category.uuid === question.category_uuid;
        })
        .sort((a, b) => {
          return a.position - b.position;
        });
    }
  }

}
