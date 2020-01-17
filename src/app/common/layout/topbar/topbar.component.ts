import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnInit
} from '@angular/core';
import { Storage } from '../../../services/storage';
import { Sidebar } from '../../../services/ui/sidebar';
import { Session } from '../../../services/session';
import { DynamicHostDirective } from '../../directives/dynamic-host.directive';
import { NotificationsToasterComponent } from '../../../modules/notifications/toaster.component';
import { Client } from '../../../services/api';
import { Subscription } from 'rxjs';
import { CommonEventsService } from '../../../services/common-events.service';

@Component({
  moduleId: module.id,
  selector: 'm-topbar',
  templateUrl: 'topbar.component.html',
  styleUrls: ['topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @ViewChild(DynamicHostDirective) host: DynamicHostDirective;

  opspot: any = window.Opspot;
  avatarSize = 'small';
  user: any = {};
  componentRef;
  componentInstance: NotificationsToasterComponent;
  commService$: Subscription;

  constructor(
    public session: Session,
    public storage: Storage,
    public sidebar: Sidebar,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private client: Client,
    public commService: CommonEventsService
  ) { }

  ngAfterViewInit() {
    // this.loadComponent();
  }
  ngOnInit() {
    this.user = this.opspot.user;
    this.getUsersOrganization();

    this.commService$ = this.commService.listen().subscribe((e: any) => {
      if (e.component && e.action) {
        console.log('RECIEVED', e);
      }
    });
  }

  ngOnDestroy() {
    this.commService$.unsubscribe();
  }

  /**
   * Open the navigation
   */
  openNav() {
    this.sidebar.open();
  }

  loadComponent() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      NotificationsToasterComponent
    ),
      viewContainerRef = this.host.viewContainerRef;

    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.notifications = [];
    this.componentInstance = this.componentRef.instance;
  }

  hamburgerMenu() {
    var x = document.getElementById('app-nav-block');
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }

  closeNav() {
    var x = document.getElementById('app-nav-block');
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }

  // getUsersOrganization() {

  // }

  offset = '';
  entities = [];
  moreData = false;
  inProgress = false;
  rating: number = 1;
  entity: any;


  getUsersOrganization() {
    let key = 'organizations';
    let ownerGuid = this.session.getLoggedInUser().guid;
    let endpoint = `api/v1/groups/owner/` + ownerGuid;

    this.client.get(endpoint, {
      limit: 12,
      offset: this.offset,
      rating: this.rating
    })
      .then((response) => {
        this.entities.push(response[key][0]);
        if(this.entities.length){
          this.entity = this.entities[0];
          // console.log("this:  ",  this.entity);
          
        }
        // for (var i = 0; i <= this.entities.length; i++) {
       
        // }
        // console.log("response: ", response);

        // if (!response[key] || response[key].length === 0) {
        //   this.moreData = false;
        //   this.inProgress = false;
        // }
        // if (refresh) {
        //   this.entities = response[key];
        // } else {
        //   if (this.offset)
        //     response[key].shift();

        //   this.entities.push(...response[key]);
        // }

        // this.offset = response['load-next'];
        // if (!this.offset) {
        //   this.moreData = false;
        // }
        // this.inProgress = false;
      })
      .catch((e) => {
        this.inProgress = false;
      });

  }
}
