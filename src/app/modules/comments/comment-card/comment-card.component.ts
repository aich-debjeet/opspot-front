import { Component, OnInit, ChangeDetectionStrategy, forwardRef, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { AttachmentService } from '../../../services/attachment';

import { Session } from '../../../services/session';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';
import { CommentsListComponent } from '../list/list.component';
import { TranslationService } from '../../../services/translation';
import { OverlayModalService } from '../../../services/ux/overlay-modal';
import { TimeDiffService } from '../../../services/timediff.service';
import { Observable } from 'rxjs';
import { ReportCreatorComponent } from '../../report/creator/creator.component';

@Component({
  selector: 'app-comment-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['parent'],
  outputs: ['_delete: delete', '_saved: saved'],
  host: {
    '(keydown.esc)': 'editing = false'
  },
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  providers: [
    {
      provide: AttachmentService,
      useFactory: AttachmentService._,
      deps: [Session, Client, Upload]
    },
    {
      provide: CommentsListComponent,
      useValue: forwardRef(() => CommentsListComponent),
     },
  ],
})
export class CommentCardComponent implements OnInit {

  // fix: AOT
  // TODO @shashi: dev? please fix
  dev: any;
  comment: any;
  editing: boolean = false;
  opspot = window.Opspot;
  currentUser
  canPost: boolean = true;
  triedToPost: boolean = false;
  inProgress: boolean = false;
  error: string = '';
  showReplies: boolean = false;
  changesDetected: boolean = false;

  _delete: EventEmitter<any> = new EventEmitter();
  _saved: EventEmitter<any> = new EventEmitter();

  reportToggle: boolean = false;
  parent: any;

  translation = {
    translated: false,
    target: '',
    error: false,
    description: '',
    source: null
  };
  isTranslatable: boolean;
  translationInProgress: boolean;
  translateToggle: boolean = false;
  commentAge$: Observable<number>;
  @Input() canEdit: boolean = false;

  @Output() onReply = new EventEmitter();
  
  

  constructor(
    public session: Session,
    public client: Client,
    public attachment: AttachmentService,
    public translationService: TranslationService,
    private overlayModal: OverlayModalService,
    private cd: ChangeDetectorRef,
    private timeDiffService: TimeDiffService,
  ) {}

  @Input('object')
  set object(value: any) {
    if (!value)
      return;
    this.comment = value;
    this.attachment.load(this.comment);

    this.isTranslatable = this.translationService.isTranslatable(this.comment);
  }

  set _editing(value: boolean) {
    this.editing = value;
  }

  saveEnabled() {
    return !this.inProgress && this.canPost && ((this.comment.description && this.comment.description.trim() !== '') || this.attachment.has());
  }

  save() {
    this.comment.description = this.comment.description.trim();

    if (!this.comment.description && !this.attachment.has()) {
      return;
    }

    let data = this.attachment.exportMeta();
    data['comment'] = this.comment.description;

    this.editing = false;
    this.inProgress = true;
    this.client.post('api/v1/comments/update/' + this.comment.guid, data)
      .then((response: any) => {
        this.inProgress = false;
        if (response.comment) {
          this._saved.next({
            comment: response.comment
          });
        }
        this.comment.edited = true;
      })
      .catch(e => {
        this.inProgress = false;
      });
  }

  applyAndSave(control: any, e) {
    e.preventDefault();

    if (!this.saveEnabled()) {
      this.triedToPost = true;
      return;
    }

    this.comment.description = control.value;
    this.save();
  }

  cancel(control: any, e) {
    e.preventDefault();

    if (this.inProgress) {
      return;
    }

    this.editing = false;
    control.value = this.comment.description;
  }

  delete() {
    if (!confirm('Do you want to delete this comment?\n\nThere\'s no UNDO.')) {
      return;
    }

    this.client.delete('api/v1/comments/' + this.comment.guid);
    if(this.parent.type === 'comment'){
      this.parent.replies_count -= 1;
    }
    this._delete.next(true);
  }

  uploadAttachment(file: HTMLInputElement) {
    this.canPost = false;
    this.triedToPost = false;

    this.attachment.upload(file)
      .then(guid => {
        this.canPost = true;
        this.triedToPost = false;
        file.value = null;
      })
      .catch(e => {
        console.error(e);
        this.canPost = true;
        this.triedToPost = false;
        file.value = null;
      });
  }

  removeAttachment(file: HTMLInputElement) {
    this.canPost = false;
    this.triedToPost = false;

    // TODO @abhijeet: resolve the bug
    // this.attachment.remove(file).then(() => {
    //   this.canPost = true;
    //   this.triedToPost = false;
    //   file.value = '';
    // }).catch(e => {
    //   console.error(e);
    //   this.canPost = true;
    //   this.triedToPost = false;
    // });
  }

  getPostPreview(message) {
    if (!message.value) {
      return;
    }

    this.attachment.preview(message.value);
  }

  translate($event: any = {}) {
    if (!$event.selected) {
      return;
    }

    if (!this.translationService.isTranslatable(this.comment)) {
      return;
    }

    this.translation.target = '';
    this.translationService.getLanguageName($event.selected)
      .then(name => this.translation.target = name);

    this.translationInProgress = true;

    this.translationService.translate(this.comment.guid, $event.selected)
      .then((translation: any) => {
        this.translationInProgress = false;
        this.translation.source = null;

        for (let field in translation) {
          this.translation.translated = true;
          this.translation[field] = translation[field].content;

          if (this.translation.source === null && translation[field].source) {
            this.translation.source = '';
            this.translationService.getLanguageName(translation[field].source)
              .then(name => this.translation.source = name);
          }
        }
      })
      .catch(e => {
        this.translationInProgress = false;
        this.translation.error = true;

        console.error('translate()', e);
      });
  }

  hideTranslation() {
    if (!this.translation.translated) {
      return;
    }

    this.translation.translated = false;
  }

  showReport() {
    this.overlayModal.create(ReportCreatorComponent, this.comment)
      .present();
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
  }

  ngOnChanges(changes) {
  //  console.log('[comment:card]: on changes', changes);
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  ngDoCheck() {
    this.changesDetected = false;
    if (this.comment.error != this.error) {
        this.error = this.comment.error;
        this.changesDetected = true;
    }

    if (this.changesDetected) {
      this.cd.detectChanges();
    }
  }
  ngOnInit(){
    this.currentUser= this.opspot.user.guid
  }

}
