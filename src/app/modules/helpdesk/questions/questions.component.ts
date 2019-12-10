import { Component, OnInit } from '@angular/core';
import { Client } from '../../../services/api/client';
import { Session } from '../../../services/session';
import { OpspotTitle } from '../../../services/ux/title';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'm-helpdesk--questions',
  templateUrl: 'questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {

  question: any = {};
  relatedQuestions = [];

  opspot: Opspot = window.Opspot;

  constructor(
    public client: Client,
    public session: Session,
    public router: Router,
    private route: ActivatedRoute,
    private title: OpspotTitle,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.load(params['uuid']);
    });
  }

  async load(uuid: string) {
    this.question = {};

    try {
      const response: any = await this.client.get(`api/v2/helpdesk/questions/question/${uuid}`);
      this.question = response.question;

      let temp: any = await this.client.get(`api/v2/helpdesk/questions`, { limit: 5000 });
      this.relatedQuestions = temp.questions
        .filter((question) => {
          return this.question.category_uuid === question.category_uuid;
        })
        .sort((a, b) => {
          return a.position - b.position;
        });
      this.title.setTitle(this.question.question);
    } catch (e) {
      console.error(e);
    }
  }

  hasVoted(direction: 'up' | 'down') {
    return this.question[`thumb_${direction}`] === true;
  }

  async castVote(direction: 'up' | 'down') {
    const key = `thumb_${direction}`;
    this.question[key] = !this.question[key];

    try {
      if (this.question[key]) {
        await this.client.put(`api/v2/helpdesk/questions/${this.question.uuid}/${direction}`);
      } else {
        await this.client.delete(`api/v2/helpdesk/questions/${this.question.uuid}/${direction}`);
      }
    } catch (e) {
      console.error(e);
      this.question[key] = !this.question[key];
    }
  }

  async delete() {
    try {
      if (confirm('Are you sure to delete ' + this.question['uuid'])) {
        await this.client.delete(`api/v2/admin/helpdesk/questions/${this.question['uuid']}`);
        this.router.navigate(['/help']);
      }
    } catch (e) {
      console.error(e);
    }
  }

}
