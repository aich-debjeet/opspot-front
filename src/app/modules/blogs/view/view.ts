import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../../../services/api';
import { Session } from '../../../services/session';
import { OpspotTitle } from '../../../services/ux/title';
import { ScrollService } from '../../../services/ux/scroll';
import { AnalyticsService } from '../../../services/analytics';
import { OpspotBlogEntity } from '../../../interfaces/entities';

import { AttachmentService } from '../../../services/attachment';
import { ContextService } from '../../../services/context.service';
import { optimizedResize } from '../../../utils/optimized-resize';

@Component({
  moduleId: module.id,
  selector: 'm-blog-view',
  inputs: ['_blog: blog', '_index: index'],
  host: {
    'class': 'm-blog'
  },
  templateUrl: 'view.html',
  styleUrls:['view.scss']
})

export class BlogView {

  opspot;
  guid: string;
  blog: OpspotBlogEntity;
  sharetoggle: boolean = false;
  deleteToggle: boolean = false;
  element;

  inProgress: boolean = false;
  moreData: boolean = true;
  activeBlog: number = 0;

  visible: boolean = false;
  index: number = 0;
  sidebarMsg = true;
  scroll_listener;

  menuOptions: Array<string> = ['edit', 'follow', 'feature', 'delete', 'report', 'subscribe', 'set-explicit', 'remove-explicit', 'rating', 'sponsored'];

  @ViewChild('lockScreen', { read: ElementRef }) lockScreen;
  remindOpen = false;
  remindMessage = '';



  constructor(
    public session: Session,
    public client: Client,
    public router: Router,
    _element: ElementRef,
    public scroll: ScrollService,
    public title: OpspotTitle,
    public attachment: AttachmentService,
    private context: ContextService,
    public analytics: AnalyticsService,
    public analyticsService: AnalyticsService
  ) {
    this.opspot = window.Opspot;
    this.element = _element.nativeElement;
    optimizedResize.add(this.onResize.bind(this));
  }


  ngOnInit() {
    this.isVisible();
    this.context.set('object:blog');
  }

  isVisible() {
    //listens every 0.6 seconds
    this.scroll_listener = this.scroll.listen((e) => {
      const bounds = this.element.getBoundingClientRect();
      if (bounds.top < this.scroll.view.clientHeight && bounds.top + bounds.height > this.scroll.view.clientHeight) {
        let url = `${this.opspot.site_url}blog/view/${this.blog.guid}`;

        if (this.blog.route) {
          url = `${this.opspot.site_url}${this.blog.route}`;
        }

        if (!this.visible) {
          window.history.pushState(null, this.blog.title, url);
          this.title.setTitle(this.blog.title);
          this.analyticsService.send('pageview', {url: `/blog/view/${this.blog.guid}`});
        }
        this.visible = true;
      } else {
        this.visible = false;
      }
    }, 0, 300);
  }

  set _blog(value: OpspotBlogEntity) {
    this.blog = value;
    // console.log("blog: ", this.blog);
    this.blog.url = `${this.opspot.site_url}${this.blog.route}`;
    
    setTimeout(() => {
      this.calculateLockScreenHeight();
    });
  }

  set _index(value: number) {
    this.index = value;
    if (this.index === 0) {
      this.visible = true;
    }
  }

  delete() {
    this.client.delete('api/v1/blog/' + this.blog.guid)
      .then((response: any) => {
        this.router.navigate(['/blog/owner']);
      });
  }

  ngOnDestroy() {
    if (this.scroll_listener)
      this.scroll.unListen(this.scroll_listener);
  }

  menuOptionSelected(option: string) {
    switch (option) {
      case 'edit':
        this.router.navigate(['/blog/edit', this.blog.guid]);
        break;
      case 'delete':
        this.delete();
        break;
      case 'set-explicit':
        this.setExplicit(true);
        break;
      case 'remove-explicit':
        this.setExplicit(false);
        break;
    }
  }

  setExplicit(value: boolean) {
    this.blog.mature = value;

    this.client.post(`api/v1/entities/explicit/${this.blog.guid}`, { value: value ? '1' : '0' })
      .catch(e => {
        this.blog.mature = this.blog.mature;
      });
  }

  calculateLockScreenHeight() {
    if (!this.lockScreen) 
      return;
    const lockScreenOverlay = this.lockScreen.nativeElement.querySelector('.m-wire--lock-screen');
    if (lockScreenOverlay) {
      const rect = lockScreenOverlay.getBoundingClientRect();

      lockScreenOverlay.style.height = `calc(100vh - ${rect.top}px)`;
    }
  }

  /**
   * called when the window resizes
   * @param {Event} event
   */
  onResize(event: Event) {
    this.calculateLockScreenHeight();
  }

  shareOptionSelected(option: string) {
    // console.log('shareOptionSelected', option);
    if (option === 'repost') {
      this.remindOpen = true;
    };
  }

  remindPost($event) {
    if ($event.message) {
      this.remindMessage = $event.message;
    }

    this.blog.reminded = true;
    this.blog.reminds++;

    this.client.post('api/v2/newsfeed/remind/' + this.blog.guid, {
      message: this.remindMessage
    })
      .catch(e => {
        this.blog.reminded = false;
        this.blog.reminds--;
      });
  }

  getOwnerIconTime() {
    let session = this.session.getLoggedInUser();
    if (session && session.guid === this.blog.ownerObj.guid) {
      return session.icontime;
    } else {
      return this.blog.ownerObj.icontime;
    }
  }

}
