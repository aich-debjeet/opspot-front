import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HashtagsSelectorComponent } from '../../hashtags/selector/selector.component';
import { TopbarHashtagsService } from '../../hashtags/service/topbar.service';
import { Tag } from '../../hashtags/types/tag';
import { Client, Upload } from '../../../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayModalService } from '../../../services/ux/overlay-modal';

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
  skillData: any[] = [];
  blogSkills: any[] = [];
  error: string = '';
  inProgress: boolean = false;
  defaultCoins: number;
  displayPaywal: boolean = false;
  meta: any;
  message = '';

  @Input('object') set data(object) {
    this.blog = object ? object.blog : null;
    this.guid = object ? object.guid : null;
    let skills = object ? object.blog.tags : null;
    skills = skills.filter(el => !!el);
    this.skillsAlter(skills);
  }
  @ViewChild('hashtagsSelector') hashtagsSelector: HashtagsSelectorComponent;
  constructor(public upload: Upload, public router: Router, public client: Client, private overlayModal: OverlayModalService, private service: TopbarHashtagsService, ) {
    this.banner = void 0;
    this.banner_top = 0;
    this.banner_prompt = false;
  }

  ngOnInit() {
    this.getTopHashtags();
  }

  async getTopHashtags() {
    const res = await this.service.load(50);
    res.map(a => {
      this.skillData.push(a.value);
    });
  }

  onTagsChange(tags: string[]) {
    this.blog.tags = tags;
  }

  skillsAlter(skills: any[]) {
    for (let i = skills.length; i--;) {
      this.blogSkills.push({ display: skills[i], value: skills[i] });
    }
  }
  onTagsAdded(tags: Tag[]) {
  }

  onTagsRemoved(tags: Tag[]) {
  }
  onItemAdded(e) {
    const skills = this.blogSkills.map(e => e.value);
    this.blog.tags = skills;

  }

  add_banner(banner: any) {
    this.banner = banner.file;
    this.blog.header_top = banner.top;
  }
  //this is a nasty hack because people don't want to click save on a banner ;@
  check_for_banner() {
    if (!this.banner)
      this.banner_prompt = true;

    return new Promise((resolve, reject) => {
      if (this.banner)
        return resolve(true);
      setTimeout(() => {
        this.banner_prompt = false;
        if (this.banner)
          return resolve(true);
        else
          return reject(false);
      }, 100);
    });
  }

  // closed(message) {
  //   // this.paywalMessage = message;
  //   // console.log("this: ", this.paywalMessage);

  //   this.displayPaywal = false;
  // }

  createEditBlog() {
    if (this.defaultCoins) {
      this.blog.wire_threshold = true
      this.blog.min = this.defaultCoins;
      this.blog.type = 'tokens';
      this.blog.message = this.message;
    }
    let blog = Object.assign({}, this.blog);
    blog.mature = blog.mature ? 1 : 0;
    blog.monetization = blog.monetization ? 1 : 0;
    blog.monetized = blog.monetized ? 1 : 0;

    this.check_for_banner().then(() => {
      if (this.error != 'undefined') this.error = '';
      this.inProgress = true;
      this.upload.post('api/v1/blog/' + this.guid, [this.banner], blog)
        .then((response: any) => {
          this.overlayModal.dismiss();
          this.router.navigate(response.route ? ['/' + response.route] : ['/blog/view', response.guid]);
          // this.canSave = true;
          this.inProgress = false;
        })
        .catch((e) => {
          // this.canSave = true;
          this.inProgress = false;
        });
    })
      .catch(() => {
        this.error = '';
        if (blog.published != 0 && !this.blog.thumbnail_src.length) {
          this.error = 'error:no-banner';
          return false;
        } else {
          this.inProgress = true;
          this.client.post('api/v1/blog/' + this.guid, this.blog)
            .then((response: any) => {
              if (response.guid) {
                this.overlayModal.dismiss();
                this.router.navigate(response.route ? ['/' + response.route] : ['/blog/view', response.guid]);
              }
              this.inProgress = false;
              // this.canSave = true;
            })
            .catch((e) => {
              this.inProgress = false;
              // this.canSave = true;
            });
        }
      });
  }

  /**
   * fix: AOT
   */
  detect() { }

  /**
   * close modal
   */
  closeModal() {
    this.overlayModal.dismiss();
  }

  displayPaywall() {
    if (this.displayPaywal) {
      this.displayPaywal = false;
    } else {
      this.displayPaywal = true;
    }
  }

  limit(e) {
    let max_chars = 3;

    if (e.target.value.length >= max_chars) {
      e.preventDefault();
    }
  }

}
