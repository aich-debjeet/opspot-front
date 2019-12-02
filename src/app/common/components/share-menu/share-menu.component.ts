import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';

type Option =
  'facebook'
  | 'twitter'
  | 'whatsapp';

@Component({
  moduleId: module.id,
  selector: 'm-share-menu',
  templateUrl: 'share-menu.component.html',
  styleUrls: ['share-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ShareMenuComponent {
  @Input() entity: any;
  @Input() options: Array<Option>;
  @Output() optionSelected: EventEmitter<Option> = new EventEmitter<Option>();
  @Output() entityGuid: EventEmitter<Option> = new EventEmitter<Option>();

  opened: boolean = false;
  shareToggle: boolean = false;
  categories: Array<any> = [];

  constructor(
    public session: Session,
    private client: Client,
    private cd: ChangeDetectorRef
  ) {
    console.log(this.entity, this.options);
  }

  shareMenuHandler() {
    this.opened = !this.opened;
  }

  selectOption(option: Option) {
    this.optionSelected.emit(option);
    this.entityGuid.emit(this.entity.guid)
    this.opened = false;

    this.detectChanges();
  }

  onModalClose() {
    // this.featureToggle = false;
  }

  detectChanges() {
    this.cd.markForCheck();
  }
}
