import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../../../services/api/client';

@Component({
  selector: 'onboarding-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss']
})
export class ProfessionsOnboardingComponent implements OnInit {

  static items = ['suggested_professions'];
  static canSkip: boolean = false;
  data: any = [];
  inProgress: boolean = false;
  model = {
    professions: []
  }
  @Output() onClose: EventEmitter<any> = new EventEmitter();



  constructor(private client: Client) {
    this.load()
  }

  ngOnInit() {
  }

  async load() {
    this.client.get('api/v4/professions/suggested', {
      limit: 50
    }).then((response: any) => {
      if (response.professions)
        this.data = response.professions;
      console.log("this.data: ", this.data);

    })
  }

  onSubmit() {
    this.inProgress = true;
    const professions = this.model.professions.map(el => el.value);
    const reqBody = {
      professions: professions ? professions : []
    }

    console.log("this.professions", reqBody);

    this.client.post('api/v4/professions/user', reqBody).then((response: any) => {

    })
  }

  close() {
    this.onClose.emit();
  }

}

