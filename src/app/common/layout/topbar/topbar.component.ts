import { Component, ComponentFactoryResolver, ViewChild, OnInit } from '@angular/core';
import { Storage } from '../../../services/storage';
import { Sidebar } from '../../../services/ui/sidebar';
import { Session } from '../../../services/session';
import { DynamicHostDirective } from '../../directives/dynamic-host.directive';
import { NotificationsToasterComponent } from '../../../modules/notifications/toaster.component';

@Component({
  moduleId: module.id,
  selector: 'm-topbar',
  templateUrl: 'topbar.component.html',
  styleUrls:['topbar.component.scss']
})

export class TopbarComponent implements OnInit{

  @ViewChild(DynamicHostDirective) host: DynamicHostDirective;

  opspot:any = window.Opspot;
  avatarSize='small';
  user:any={}
  componentRef;
  componentInstance: NotificationsToasterComponent;

  constructor(public session: Session, public storage: Storage, public sidebar: Sidebar, private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    // this.loadComponent();

  }
  ngOnInit(){
    this.user=this.opspot.user
  }

	/**
	 * Open the navigation
	 */
  openNav() {
    this.sidebar.open();
  }

  loadComponent() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(NotificationsToasterComponent),
      viewContainerRef = this.host.viewContainerRef;

    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.componentRef.notifications = [];
    this.componentInstance = this.componentRef.instance;
  }

  hamburgerMenu(){
    
          var x = document.getElementById("app-nav-block");
              if (x.style.display === "block") {
                  x.style.display = "none";
              } else {
                  x.style.display = "block";
              }
     }

   closeNav(){
    var x = document.getElementById("app-nav-block");
    console.log(x.style)
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
   }   
}
