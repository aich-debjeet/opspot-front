import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';


@Component({
  selector: 'app-big-event-view',
  templateUrl: './big-event-view.html',
  styleUrls: ['./big-event-view.scss']
})
export class BigEventView implements OnInit {


  
  constructor(
    private formBuilder: FormBuilder,
    public session: Session,
    public client: Client
  ) {}
  

  ngOnInit() {
  }


  






}
