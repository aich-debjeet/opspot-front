import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HashtagsSelectorComponent } from '../../../../hashtags/selector/selector.component';
import { Tag } from '../../../../hashtags/types/tag';
import { Client, Upload } from '../../../../../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayModalService } from '../../../../../services/ux/overlay-modal';

@Component({
  selector: 'app-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss']
})
export class BlogPreviewComponent implements OnInit {
  blog: any;
  guid: string;
  banner: any;
  banner_top: number = 0;
  banner_prompt: boolean = false;

  @Input('object') set data(object) {
    console.log(object);
    this.blog = object ? object.blog : null;
    this.guid = object ? object.guid : null;
  }
  @ViewChild('hashtagsSelector') hashtagsSelector: HashtagsSelectorComponent;
  constructor(public upload: Upload, public router: Router, public client: Client, private overlayModal: OverlayModalService) {
    this.banner = void 0;
    this.banner_top = 0;
    this.banner_prompt = false;
  }

  ngOnInit() {
  }

  onTagsChange(tags: string[]) {
    this.blog.tags = tags;
  }

  onTagsAdded(tags: Tag[]) {
  }

  onTagsRemoved(tags: Tag[]) {
  }

  add_banner(banner: any) {
    console.log(banner)
    var self = this;
    this.banner = banner.file;
    this.blog.header_top = banner.top;
  }
  //this is a nasty hack because people don't want to click save on a banner ;@
  check_for_banner() {
    console.log('banner', this.banner)
    if (!this.banner)
      this.banner_prompt = true;

    return new Promise((resolve, reject) => {
      if (this.banner)
        return resolve(true);
      setTimeout(() => {
        if (this.banner)
          return resolve(true);
        else
          return reject(false);
      }, 100);
    });
  }

  createEditBlog() {
    const blog = Object.assign({}, this.blog);
    blog.mature = blog.mature ? 1 : 0;
    blog.monetization = blog.monetization ? 1 : 0;
    blog.monetized = blog.monetized ? 1 : 0;

    this.check_for_banner().then(() => {
      this.upload.post('api/v1/blog/' + this.guid, [this.banner], blog)
        .then((response: any) => {
          this.overlayModal.dismiss();
          this.router.navigate(response.route ? ['/' + response.route] : ['/blog/view', response.guid]);
          // this.canSave = true;
          // this.inProgress = false;
        })
        .catch((e) => {
          // this.canSave = true;
          // this.inProgress = false;
        });
    })
      .catch(() => {
        this.client.post('api/v1/blog/' + this.guid, this.blog)
          .then((response: any) => {
            if (response.guid) {
              this.overlayModal.dismiss();
              this.router.navigate(response.route ? ['/' + response.route] : ['/blog/view', response.guid]);
            }
            // this.inProgress = false;
            // this.canSave = true;
          })
          .catch((e) => {
            // this.inProgress = false;
            // this.canSave = true;
          });
      });
  }

  /**
   * fix: AOT
   */
  detect() {}

  /**
   * close modal
   */
  closeModal() {
    this.overlayModal.dismiss();
  }

}
