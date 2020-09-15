import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../../services/api';
import { AttachmentService } from '../../../../services/attachment';
import { remove as _remove, findIndex as _findIndex } from 'lodash';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OverlayModalService } from '../../../../services/ux/overlay-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../../organization-service';

@Component({
    selector: 'app-create-talent',
    templateUrl: './create-talent.html',
    styleUrls: ['./create-talent.scss']
})
export class CreateTalent implements OnInit {

    organization: any;
    organization_guid: any;
    inProgress = false;
    errorMessage = '';
    attach_guid = [];
    cards = [];
    meta: any = {
        message: '',
        wire_threshold: null
    };
    createTalentForm: FormGroup;
    showDesktop: boolean;
    showMobile: boolean;
    _opts: any;
    set opts(opts: any) {
        this._opts = opts;
    }


    @Input('object') set data(object) {
        this.organization = object;
        if (this.organization) {
            this.organization_guid = this.organization.guid;
            console.log("nsdbjf: ", this.organization_guid);

        }
    }

    reqBody: any = {
        organisation_guid: '',
        title: '',
        description: '',
        entity_type: 'talent',
        container_guid: '',
        // contact_info: 8800637951,
        // special_tag: vinay_vfv,
        //custom_type:talent
        attachment_guid: ''
    };

    constructor(
        private client: Client,
        public attachment: AttachmentService,
        public formBuilder: FormBuilder,
        private overlayModal: OverlayModalService,
        public route: ActivatedRoute,
        private service: OrganizationService,
        private router: Router

    ) {
        this.createTalentForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []]
        });
    }

    ngOnInit() {
        if (window.innerWidth > 785) {
            this.showDesktop = true;
            this.showMobile = false;
        } else {
            this.showDesktop = false;
            this.showMobile = true;
            this.route.params.subscribe(params => {
                if (params['guid']) {
                    this.load(params['guid'])
                }
            })
        }
    }

    async load(guid) {
        let organization = await this.service.load(guid)
        if (organization)
            this.organization_guid = organization.guid;
    }

    uploadAttachment(file: HTMLInputElement, event) {
        if (file.value) { // this prevents IE from executing this code twice
            this.inProgress = true;
            this.attachment.upload(file, this.attach_guid)
                .then(guid => {
                    let obj = {};
                    obj['guid'] = guid;
                    obj['src'] = this.attachment.getPreview();
                    this.addAttachment(obj);
                    this.inProgress = false;
                    file.value = null;
                })
                .catch(e => {
                    if (e && e.message) {
                    }
                    file.value = null;
                    this.inProgress = false;
                    this.attachment.reset();
                });
        }
    }

    addAttachment(obj) {
        if (this.cards.length < 1) {
            this.cards.push(obj);
        }
    }

    removeAttachment(file: HTMLInputElement, imageId: string) {
        if (this.inProgress) {
            this.attachment.abort();
            // this.canPost = true;
            this.inProgress = false;
            this.errorMessage = '';
            return;
        }

        // if we're not uploading a file right now
        this.attachment.setPendingDelete(false);
        // this.canPost = false;
        this.inProgress = true;

        this.errorMessage = '';
        this.attachment.remove(imageId, file, this.attach_guid)
            .then(guid => {
                this.inProgress = false;
                // this.canPost = true;
                // file.value = '';
                this.cards = _remove(this.cards, function (n) {
                    return n.guid !== guid;
                });
            })
            .catch(e => {
                // this.inProgress = false;
                // this.canPost = true;
            });
    }


    create() {
        this.inProgress = true;

        let data = Object.assign(this.meta, this.attachment.exportMeta());
        // console.log("data: ", data);

        if (data.attachment_guid.length > 0) {
            this.reqBody.attachment_guid = data.attachment_guid;

        } else if (this.attach_guid.length === 1) {
            this.reqBody.attachment_guid = this.attach_guid[0];
        } else {
            this.reqBody.attachment_guid = this.attach_guid;
        }

        this.reqBody.organisation_guid = this.organization_guid;
        this.reqBody.container_guid = this.organization_guid;
        this.reqBody.title = this.createTalentForm.value.title;
        this.reqBody.description = this.createTalentForm.value.description;
        this.client.post('api/v3/organizations/organization/talent', this.reqBody)
            .then((res) => {
                this.inProgress = false;
                if (this._opts && this._opts.onUpdate) {
                    this._opts.onUpdate(res);
                    // close modal
                }
                this.closeModal();
                this.router.navigate(['/organization/profile', this.organization_guid, 'feed'])
            })
    }

    closeModal() {
        this.overlayModal.dismiss();
    }

}


// organisation_guid: 1135543634117005324
// contact_info: 8800637951
// special_tag: vinay_vfv
// title: ok
// description: ok
// entity_type: talent
// container_guid: 1135543634117005324
// //custom_type:talent
// attachment_guid: 1147793157350494214
// Screen reader support enabled.
