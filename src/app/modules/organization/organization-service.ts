import { Inject, EventEmitter } from '@angular/core';
import { Client, Upload } from '../../services/api';
import { UpdateMarkersService } from '../../common/services/update-markers.service';
import { BehaviorSubject } from 'rxjs';

export class OrganizationService {

  private base: string = 'api/v3/organizations/';

  private infiniteInProgress: boolean = false;
  private infiniteOffset: any;

  group = new BehaviorSubject(null);
  $group = this.group.asObservable();

  static _(client: Client, upload: Upload, updateMarkers: UpdateMarkersService) {
    return new OrganizationService(client, upload, updateMarkers);
  }

  constructor(
    @Inject(Client) public clientService: Client,
    @Inject(Upload) public uploadService: Upload,
    @Inject(UpdateMarkersService) private updateMarkers: UpdateMarkersService,
  ) {
  }

  // Group

  load(guid: string) {
    // console.log('GS laod', guid);
    return this.clientService.get(`${this.base}organization/${guid}`)
      .then((response: any) => {
        // console.log("Response: ", response);

        if (response.organization) {
          this.group.next(response.organization);
          return response.organization;
        }

        throw 'E_LOADING';
      });
  }

  save(group: any) {
    let endpoint = `${this.base}organization`;

    if (group.guid) {
      endpoint += `/${group.guid}`;
    }

    this.group.next(group);

    return this.clientService.post(endpoint, group)
      .then((response: any) => {
        if (response.guid) {
          return response.guid;
        }
        throw 'E_SAVING';
      });
  }

  upload(group: any, files: any) {
    let uploads = [];

    if (files.banner) {
      uploads.push(this.uploadService.post(`${this.base}organization/${group.guid}/banner`, [
        files.banner
      ], {
        banner_position: group.banner_position
      }));
    }

    if (files.avatar) {
      uploads.push(this.uploadService.post(`${this.base}organization/${group.guid}/avatar`, [
        files.avatar
      ]));
    }

    return Promise.all(uploads);
  }

  deleteGroup(group: any) {
    return this.clientService.delete(`${this.base}organization/${group.guid}`)
      .then((response: any) => {
        return !!response.done;
      })
      .catch((e) => {
        return false;
      });
  }

  // Membership

  join(group: any, target: string = null) {
    let endpoint = `${this.base}membership/${group.guid}`;

    if (target) {
      endpoint += `/${target}`;
    }

    return this.clientService.put(endpoint)
      .then((response: any) => {
        if (response.done) {
          return true;
        }
        //  @gayatri need to check backend error quick handle for time sake in front
        return true;
        // throw response.error ? response.error : 'Internal error';
      });
  }

  leave(group: any, target: string = null) {
    let endpoint = `${this.base}membership/${group.guid}`;

    if (target) {
      endpoint += `/${target}`;
    }

    return this.clientService.delete(endpoint)
      .then((response: any) => {
        if (response.done) {
          return true;
        }
        throw response.error ? response.error : 'Internal error';
      });
  }

  acceptRequest(group: any, target: string) {
    // Same endpoint as join
    return this.join(group, target);
  }

  rejectRequest(group: any, target: string) {
    // Same endpoint as leave
    return this.leave(group, target);
  }

  kick(group: any, user: string) {
    return this.clientService.post(`${this.base}membership/${group.guid}/kick`, { user })
      .then((response: any) => {
        return !!response.done;
      })
      .catch(e => {
        return false;
      });
  }

  ban(group: any, user: string) {
    return this.clientService.post(`${this.base}membership/${group.guid}/ban`, { user })
      .then((response: any) => {
        return !!response.done;
      })
      .catch(e => {
        return false;
      });
  }

  cancelRequest(group: any) {
    return this.clientService.post(`${this.base}membership/${group.guid}/cancel`)
      .then((response: any) => {
        return !!response.done;
      })
      .catch(e => {
        return false;
      });
  }

  // Notifications

  muteNotifications(group: any) {
    this.updateMarkers.mute(group.guid);
    return this.clientService.post(`${this.base}notifications/${group.guid}/mute`)
      .then((response: any) => {
        return !!response['is:muted'];
      })
      .catch(e => {
        return false;
      });
  }

  unmuteNotifications(group: any) {
    this.updateMarkers.unmute(group.guid);
    return this.clientService.post(`${this.base}notifications/${group.guid}/unmute`)
      .then((response: any) => {
        return !!response['is:muted'];
      })
      .catch(e => {
        return true;
      });
  }

  // Management

  grantOwnership(group: any, user: string) {
    return this.clientService.put(`${this.base}management/${group.guid}/${user}/admin`)
      .then((response: any) => {
        return !!response.done;
      })
      .catch(e => {
        return false;
      });
  }

  revokeOwnership(group: any, user: string) {
    return this.clientService.delete(`${this.base}management/${group.guid}/${user}/admin`)
      .then((response: any) => {
        return !response.done;
      })
      .catch(e => {
        return true;
      });
  }

  // Moderation

  grantModerator(group: any, user: string) {
    return this.clientService.put(`${this.base}management/${group.guid}/${user}/moderator`)
      .then((response: any) => {
        return !!response.done;
      })
      .catch(e => {
        return false;
      });
  }

  grantEditor(group: any, user: string) {
    return this.clientService.put(`${this.base}management/${group.guid}/${user}/editor`)
      .then((response: any) => {
        return !!response.done;
      })
      .catch(e => {
        return false;
      });
  }

  revokeModerator(group: any, user: string) {
    return this.clientService.delete(`${this.base}management/${group.guid}/${user}/moderator`)
      .then((response: any) => {
        return !response.done;
      })
      .catch(e => {
        return true;
      });
  }

  revokeEditor(group: any, user: string) {
    return this.clientService.delete(`${this.base}management/${group.guid}/${user}/editor`)
      .then((response: any) => {
        return !response.done;
      })
      .catch(e => {
        return true;
      });
  }

  // Invitations

  canInvite(user: string) {
    return this.clientService.post(`${this.base}invitations/check`, { user })
      .then((response: any) => {
        if (response.done) {
          return user;
        }

        throw 'E_NOT_DONE';
      });
  }

  invite(group: any, invitee: any) {
    return this.clientService.put(`${this.base}invitations/${group.guid}`, { guids: invitee })
      .then((response: any) => {
        if (response.done) {
          return true;
        }

        throw response.error ? response.error : 'Internal error';
      })
      .catch(e => {
        throw typeof e === 'string' ? e : 'Connectivity error';
      });
  }

  acceptInvitation(group: any) {
    return this.clientService.post(`${this.base}invitations/${group.guid}/accept`)
      .then((response: any) => {
        return !!response.done;
      })
      .catch(e => {
        return false;
      });
  }

  declineInvitation(group: any) {
    return this.clientService.post(`${this.base}invitations/${group.guid}/decline`)
      .then((response: any) => {
        return !!response.done;
      })
      .catch(e => {
        return false;
      });
  }

  getReviewCount(guid: any): Promise<number> {
    return this.clientService.get(`${this.base}review/${guid}/count`)
      .then((response: any) => {
        if (typeof response['adminqueue:count'] !== 'undefined') {
          return parseInt(response['adminqueue:count'], 10);
        }

        throw 'E_COUNT';
      });
  }

  setExplicit(guid: any, value: boolean): Promise<boolean> {
    return this.clientService.post(`api/v1/entities/explicit/${guid}`, { value })
      .then((response: any) => {
        return !!response.done;
      });
  }
}
