import { NotificationService } from './notification.service';
import { clientMock } from '../../../tests/client-mock.spec';
import { sessionMock } from '../../../tests/session-mock.spec';
import { socketMock } from '../../../tests/socket-mock.spec';
import { fakeAsync, tick } from '@angular/core/testing';
import { opspotTitleMock } from '../../../app/mocks/services/ux/opspot-title.service.mock.spec';

describe('NewsfeedService', () => {

  let service: NotificationService;

  beforeEach(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    service = new NotificationService(clientMock, sessionMock, socketMock, opspotTitleMock);
    clientMock.response = {};
  });

  afterEach(()=> {
    jasmine.clock().uninstall();
  });

  it('should be instantiated', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe when listening', fakeAsync(() => {
    window.Opspot.navigation = {};
    window.Opspot.navigation.topbar = [];
    window.Opspot.notifications_count = 0;
    const entity: any = {
      guid: 123,
    };

    service.listen();
    jasmine.clock().tick(10);
    expect(socketMock.subscribe).toHaveBeenCalled();
    service.increment(4);

    expect(window.Opspot.notifications_count).toBe(4);

  }));
  
});
