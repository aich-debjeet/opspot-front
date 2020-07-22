import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../../../services/api/client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'onboarding-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss']
})
export class ProfessionsOnboardingComponent implements OnInit {

  static items = ['suggested_professions'];
  static canSkip: boolean = true;
  data: any = [];
  inProgress: boolean = false;
  model = {
    professions: []
  }
  @Output() onClose: EventEmitter<any> = new EventEmitter();



  constructor(
    private client: Client,
    private toastr: ToastrService) {
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
    })
  }

  onSubmit() {
    let professions = this.model.professions.map(el => el.value);
   
    if (professions.length == 0) {
      this.toastr.error('Please add atleast one profession');
      return;
    }

    let reqBody = {
      professions: professions ? professions : []
    }

    this.inProgress = true;

    this.client.post('api/v4/professions/user', reqBody)
      .then((response: any) => {
        this.onClose.emit();
        this.inProgress = false;
        this.model.professions = [];
      })
      .catch((e) => {
        this.inProgress = false;
        this.model.professions = [];
      });
  }

  close() {
    this.onClose.emit();
  }

}

