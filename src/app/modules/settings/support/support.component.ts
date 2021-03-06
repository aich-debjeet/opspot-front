import { Component, OnInit } from '@angular/core';
import { Client } from '../../../services/api/client';
import { REASONS, REPORT_ACTIONS } from '../../../services/list-options';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  filter: string = 'review';

  appeals: any[] = [];

  inProgress: boolean = false;
  offset: string = '';
  moreData: boolean = true;

  constructor(private client: Client) { }

  ngOnInit() {
    this.load(true);
  }

  async load(refresh: boolean = false) {
    if (refresh) {
      this.inProgress = false;
      this.offset = '';
      this.moreData = true;
      this.appeals = [];
    }

    this.inProgress = true;

    try {
      let response: any = await this.client.get(`api/v1/entities/report/appeal/${this.filter}`, {
        limit: 12,
        offset: this.offset
      });

      if (refresh) {
        this.appeals = [];
      }
      if (response.data.length === 0) {
        this.inProgress = false;
        this.moreData = false;
      } else {
        if (this.appeals && !refresh) {
          this.appeals.push(...response.data);
        } else {
          this.appeals = response.data
        }

        if (response['load-next']) {
          this.offset = response['load-next'];
        } else {
          this.moreData = false;
        }
      }
    } catch (e) {
      // TODO: show error
    } finally {
      this.inProgress = false;
    }
  }

  async sendAppeal(appeal, content: string, i: number) {
    appeal.inProgress = true;

    try {
      let response: any = await this.client.post(`api/v1/entities/report/appeal/${appeal.guid}`, {
        note: content
      });

      this.appeals.splice(i, 1);
    } catch (e) {
      alert((e && e.message) || 'Error sending appeal');
    }
  }

  parseAction(action: string) {
    return typeof REPORT_ACTIONS[action] !== 'undefined' ?
      REPORT_ACTIONS[action] :
      action;
  }

  onChange(filter) {
    // console.log(filter)
    this.filter = filter;
    this.load(true);
  }

}
