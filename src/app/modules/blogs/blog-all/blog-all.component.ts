import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-all',
  templateUrl: './blog-all.component.html',
  styleUrls: ['./blog-all.component.scss']
})
export class BlogAllComponent implements OnInit {

  canDelete: boolean = false;
  isTranslatable: boolean;
  menuOptions: Array<string> = ['edit', 'delete'];


  offset: string = '';
  moreData: boolean = true;
  inProgress: boolean = false;
  entities_0: Array<any> = [];
  entities_1: Array<any> = [];
  filter: string = '';
  _filter2: string = '';
  rating: number = 1;
  filteredArray = [];
  paramsSubscription: Subscription;
  selectedGuid: string;

  constructor(public session: Session, public router: Router, private route: ActivatedRoute, public client: Client) {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      if (params['status']) {
        console.log(params['status'])
        if(!this.offset.length){
          this.offset = '';
          this.filteredArray = [];
          this.filter = params['status'];
          this.loadMyBlogs(true)
        }
      }
    })
  }
  ngOnInit() {
    // this.loadMyBlogs(true);
  }
  // onChange(e: any) {
  //   console.log(e);
  //   if (e == 'MyBlogs') {
  //     this.filteredArray = this.entities_0
  //   }
  //   else if (e == 'Drafts') {
  //     this.filteredArray = this.entities_0.filter(item => item.access_id != '2');
  //   }
  //   else if (e == 'Published') {
  //     this.filteredArray = this.entities_0.filter(item => item.access_id == '2');
  //   }
  // }

  loadMyBlogs(refresh: boolean = false) {
    this._filter2 = this.session.getLoggedInUser().guid;
    let endpoint = 'api/v2/feeds/container/' + this._filter2 + '/blogs/' + this.filter;

    this.client.get(endpoint, {
      limit: 10,
      offset: this.offset,
      sync: this.rating,
      container_guid: this._filter2,
      as_activities: 0,
    })
      .then((response: any) => {
        console.log(response);
        if (!response.entities || !response.entities.length) {
          this.moreData = false;
          this.inProgress = false;
          return false;
        }
        this.filteredArray.push(...response.entities);
        this.offset = response['load-next'];
        if (!this.offset) {
          this.moreData = false;
        }
        this.inProgress = false;
      })
      .catch((e) => {
        this.inProgress = false;
      });
  }
  deleteBlog(guid: string) {
    const index: number = this.filteredArray.findIndex((value) => {
      return value.guid === guid
    });
    this.filteredArray.splice(index, 1);
  }
}
