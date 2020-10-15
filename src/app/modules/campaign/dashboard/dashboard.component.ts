import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../../services/api/client';
import { enrollmentList ,PagedData, Page} from '../enrollmentList';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rows = new Array<enrollmentList>();
  page = new Page();
  columns = [{ name: 'name' }, { name: 'category' }, { name: 'phone' } ,{ name: 'email' }, { name: 'gender' }, { name: 'location' }, { name: 'status' }];
  @ViewChild('myTable') table;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private client: Client,
  ) {
    this.route.params.subscribe(params => {
      if (params['guid']) {
        this.getListedProfiles(params['guid'], {offset: 0, pageSize: 10})
      }
    })
  }

  ngOnInit() {
    this.setPage({offset: 0, pageSize: 10});
  }
  getListedProfiles(guid: string, pageInfo): void {
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;
    console.log('guid is', guid);
    this.client.get(`api/v3/event/enrollment/${guid}/all`).then(response => {
      // this.rows = response['enrollments'];
      let pagedData= new PagedData<enrollmentList>();
      this.page.totalElements = response['enrollments'].length;
      this.page.totalPages = pageInfo.totalElements / pageInfo.size;
      let start = this.page.pageNumber * this.page.size;
      let end = Math.min((start + this.page.size), this.page.totalElements);
      for (let i = start; i < end; i++){
        let jsonObj = response['enrollments'][i];
        let employee = new enrollmentList(jsonObj.fullname, jsonObj.subtype, jsonObj.email, jsonObj.phone_no,jsonObj.gender, jsonObj.location, jsonObj.enrollment_status);
        pagedData.data.push(employee);
        this.rows = pagedData.data;
    }
    pagedData.page= this.page;
      console.log('promise', response)
    })
  }
  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.page.size = pageInfo.pageSize;
  }
  getPageData(){}
}
