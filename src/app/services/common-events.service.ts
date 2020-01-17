import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class CommonEventsService {

    static _() {
        return new CommonEventsService();
    }
    
    private listners = new Subject<any>();

    listen(): Observable<any> {
        return this.listners.asObservable();
    }

    trigger(data: any) {
        // console.log('COMM EVENTS SERVICE', data);
        this.listners.next(data);
    }

}

/**
 * Usage
 * 
 * Event trigger,
 * this.commService.trigger({
      component: 'TargetComponent',
      action: 'TargetAction'
    });
 * 
 * Event listen,
 * this.commService = this.commService.listen().subscribe((e: any) => {
      if (e.component && e.action) {
        console.log('triggered', e);
      }
    });

    // ngOnDestroy
    this.commService.unsubscribe();
 * 
 */
