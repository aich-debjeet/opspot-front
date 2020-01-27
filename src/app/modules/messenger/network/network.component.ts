import { Component, OnInit } from '@angular/core';
import { Session } from './../../../services/session';
import { Router } from '@angular/router';
import { OpspotTitle } from '../../../services/ux/title';

@Component({
  selector: 'm-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  conversation: any;
  q: string;

  constructor(
    private session: Session,
    private router:  Router,
    public title: OpspotTitle,
  ) {
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
    this.title.setTitle('Network');
  }

  loadConversation(conversation: any) {
    this.conversation = conversation;
    this.conversation['isActive'] = true;
  }

}
