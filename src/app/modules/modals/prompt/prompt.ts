import { Component, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'm-modal-prompt',
  inputs: ['open', 'okButton', 'cancelButton', 'closeAfterAction'],
  outputs: ['actioned', 'closed'],
  templateUrl: 'prompt.html'
})
export class PromptModal {

  open: boolean = false;
  closed: EventEmitter<any> = new EventEmitter();
  actioned: EventEmitter<any> = new EventEmitter();
  inProgressEmitter: EventEmitter<any> = new EventEmitter();
  completedEmitter: EventEmitter<any> = new EventEmitter();

  inProgress: boolean = false;

  okButton: string = 'Save';
  cancelButton: string = 'Cancel';
  closeAfterAction: boolean = false;

  constructor() {
    this.inProgressEmitter.subscribe((value: boolean) => {
      this.inProgress = value;
    });

    this.completedEmitter.subscribe((value: number) => {
      if (this.closeAfterAction) {
        this.close(null);
        return;
      }
    });
  }

  close($event) {
    this.open = false;

    this.closed.emit({
      $event: $event
    });
  }

  action($event) {
    this.actioned.emit({
      $event: $event,
      inProgress: this.inProgressEmitter,
      completed: this.completedEmitter
    });
  }
}
