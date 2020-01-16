import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-enrolment-dashboard-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../dashboard.component.scss']
})
export class EnrolmentDashboardListComponent {
  @Input() entities: any[] = [];
  @Output() seeAll: EventEmitter<any> = new EventEmitter();

  searchType(type: string) {
    this.seeAll.emit(type);
  }
}
