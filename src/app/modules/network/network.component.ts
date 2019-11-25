import { Component, OnInit } from '@angular/core';
import { Session } from './../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  conversation: any;

  constructor(
    private session: Session,
    private router:  Router
  ) {
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
  }

  loadConversation(conversation: any) {
    this.conversation = conversation;
    this.conversation['isActive'] = true;
  }

}
