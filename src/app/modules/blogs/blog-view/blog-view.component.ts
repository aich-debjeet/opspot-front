import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  @Input() entity: any;
  @Output() deletedBlog: EventEmitter<any> = new EventEmitter();
  canDelete: boolean = false;
  isTranslatable: boolean;
  menuOptions: Array<string> = ['edit', 'delete'];

  constructor(
    public router: Router,
    public client: Client,
    public session: Session
  ) { }

  ngOnInit() {
  }
  menuOptionSelected(option: string) {
    switch (option) {
      case 'edit':
        this.router.navigate(['/blog/edit', this.entity.guid]);
        break;
      case 'delete':
        this.delete();
        break;
    }
  }

  delete() {
    this.client.delete('api/v1/blog/' + this.entity.guid)
      .then((response: any) => {
        // this.router.navigate(['/blog/owner']);
        this.deletedBlog.emit(this.entity.guid)
      });
  }
}
