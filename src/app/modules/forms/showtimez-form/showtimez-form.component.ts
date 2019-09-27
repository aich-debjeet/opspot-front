import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Session } from '../../../services/session';
import { AttachmentService } from '../../../services/attachment';
import { Upload } from '../../../services/api/upload';
import { Client } from '../../../services/api/client';

import { remove as _remove, findIndex as _findIndex } from 'lodash';

@Component({
  selector: 'app-showtimez-form',
  templateUrl: './showtimez-form.component.html',
  styleUrls: ['./showtimez-form.component.scss']
})
export class ShowtimezFormComponent implements OnInit {

  @Output() ChangeDefault: EventEmitter<any> = new EventEmitter<any>();
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  @Output() load: EventEmitter<any> = new EventEmitter<any>();

  showTimezForm:FormGroup;
  eventSubmitted: boolean = false;
  meta: any = {
    message: '',
    wire_threshold: null
  };
  tags = [];
  cards = [];
  public timeMask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  constructor(public session: Session, public client: Client, public upload: Upload, public attachment: AttachmentService, private formBuilder: FormBuilder) { 
    this.showTimezForm =  this.formBuilder.group({
      eventTitle:['', [Validators.required]],
      eventDescription:['', [Validators.required]],
      eventsLocation:['', [Validators.required]],
      eventdate:['', [Validators.required]],
      eventTime:['', [Validators.required]],
      eventImage:['']
    })
  }

  ngOnInit() {
  }

  uploadAttachment(file: HTMLInputElement, event) {
    console.log(file, event, this.attachment)
    if (file.value) { // this prevents IE from executing this code twice

      this.attachment.upload(file)
        .then(guid => {
          let obj = {};
          obj['guid'] = guid;
          obj['imageLink'] = this.attachment.getPreview();
          console.log(guid)
          console.log(obj)
          this.cards.push(obj);
          console.log(this.cards)
          // if (this.attachment.isPendingDelete()) {
          //   this.removeAttachment(file);
          // }
          file.value = null;
        })
        .catch(e => {
          console.log(e)
          if (e && e.message) {
          }
          file.value = null;
          this.attachment.reset();
        });
    }
  }

  removeAttachment(file: HTMLInputElement, imageId: string) {
    console.log(file, imageId)

    // if we're not uploading a file right now
    // this.attachment.setPendingDelete(false);
    // this.canPost = false;
    // this.inProgress = true;

    // this.errorMessage = '';

    this.attachment.remove(file, imageId).then((guid) => {
      file.value = '';
      this.cards = _remove(this.cards, function (n) {
        return n.guid !== guid;
      });
      console.log(this.cards)
    }).catch(e => {
      console.error(e);
    });
  }

  eventSubmit(){
    this.eventSubmitted = true;
    let data = Object.assign(this.meta, this.attachment.exportMeta());

    data.attachment_guid = data.attachment_guid;
    data.title = this.showTimezForm.value.eventTitle;
    data.description = this.showTimezForm.value.eventDescription;
    data.location = this.showTimezForm.value.eventsLocation;
    // data.eventdate = this.showTimezForm.value.eventdate;
    // data.eventTime = this.showTimezForm.value.eventTime;
    data.published = true;
    data.start_time_date = new Date(`${this.showTimezForm.value.eventdate} ${this.showTimezForm.value.eventTime}`)

    console.log(data)
    if(this.showTimezForm.valid){
      this.client.post('api/v3/event', data)
      .then((data: any) => {
        // data.activity.boostToggle = true;
        this.load.emit(data);
        this.attachment.reset();
        this.meta = { wire_threshold: null };
        
        this.eventSubmitted = false;
      })
      .catch((e) => {
        
        this.eventSubmitted = false;
        alert(e.message);
        
      });
    }
  }
  changeToDefault() {
    this.ChangeDefault.emit();
  }
  close(){
    this.Close.emit();
  }

  changeRegex(e) {
    console.log(e)
    if (e.target.value.charAt(0) == '2') {
      this.timeMask[1] = new RegExp('[0-3]')
    } else {
      this.timeMask[1] = new RegExp('[0-9]')
    }
  }

}
