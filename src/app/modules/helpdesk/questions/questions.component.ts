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
  // url = '';
  opspot: Opspot = window.Opspot;
  // isVisbaleVideo;
 
  constructor(
    public client: Client,
    public session: Session,
    public router: Router,
    private route: ActivatedRoute,
    private title: OpspotTitle,
   
      
   
  ) {
    
  }

  public get isCommon () {
    return (this.question.category_uuid === 'b554a4ae-8fc7-46c0-bfbb-bd6698d89d92' || 
    this.question.category_uuid === '12dcae9d-eb37-42e5-bf3a-9d244987c4bf' ||
    this.question.category_uuid === 'a9bae4b8-2a54-457a-8485-49f16e7e948d' || 
    this.question.category_uuid === 'd5221dc3-2ddc-4b83-bc19-225d56ce2dca' || 
    this.question.category_uuid === 'a9bae4b8-2a54-457a-8485-49f16e7e948d' ||
    this.question.category_uuid === '1c39aaf1-21fc-4bcb-bce0-954f697d0e90');
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

      //temporary fix to get related questions since related api point had got issues
      let temp: any = await this.client.get(`api/v2/helpdesk/questions`, { limit: 5000 });
      this.relatedQuestions = temp.questions
        .filter((question) => {
          return this.question.category_uuid === question.category_uuid;
        })
        .sort((a, b) => {
          return a.position - b.position;
        });
        // console.log(this.question)
        // this.updateURL();
;      this.title.setTitle(this.question.question);
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

  // updateURL() {
  //   this.url = "https://www.youtube.com/embed/feZUWIIFklU";
  // }
}
