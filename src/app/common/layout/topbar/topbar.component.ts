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

  organization: any;

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
    this.getUsersOrganization();
    this.loadLoggedInUser();

    this.session.isLoggedIn(async(is) => {
      this.loadLoggedInUser();
    });

    this.commService$ = this.commService.listen().subscribe((e: any) => {
      if (e.component && e.action) {
        if (e.component === 'TopbarComponent') {
          if (e.action === 'orgCreated' || e.action === 'orgDeleted') {
            this.getUsersOrganization();
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.commService$.unsubscribe();
  }

  loadLoggedInUser() {
    this.user = this.opspot.user;
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

  getUsersOrganization() {
    let ownerGuid = this.session.getLoggedInUser().guid;

    this.client.get(`api/v1/groups/owner/` + ownerGuid, {
      limit: 12,
      offset: '',
      rating: 1
    })
      .then((response) => {
        if(response && response['organizations']) {
          this.organization = response['organizations'][0];
        }
      })
      .catch((e) => { });

  }
}
