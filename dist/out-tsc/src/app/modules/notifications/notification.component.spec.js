"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var material_mock_spec_1 = require("../../../tests/material-mock.spec");
var notification_component_1 = require("./notification.component");
var token_pipe_1 = require("../../common/pipes/token.pipe");
var session_1 = require("../../services/session");
var testing_2 = require("@angular/router/testing");
var session_mock_spec_1 = require("../../../tests/session-mock.spec");
var excerpt_1 = require("../../common/pipes/excerpt");
describe('NotificationsComponent', function () {
    var comp;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                material_mock_spec_1.MaterialMock,
                notification_component_1.NotificationComponent,
                token_pipe_1.TokenPipe,
                excerpt_1.ExcerptPipe,
            ],
            imports: [testing_2.RouterTestingModule],
            providers: [
                { provide: session_1.Session, useValue: session_mock_spec_1.sessionMock },
            ]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function (done) {
        jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
        jasmine.clock().uninstall();
        jasmine.clock().install();
        fixture = testing_1.TestBed.createComponent(notification_component_1.NotificationComponent);
        comp = fixture.componentInstance;
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "group_activity",
            'entityObj': {
                'title': 'aaaaaaaaaaa'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                group: {},
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        if (fixture.isStable()) {
            done();
        }
        else {
            fixture.whenStable().then(function () {
                done();
            });
        }
    });
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('Should load the notification', function () {
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('name');
    });
    it('Should load the notification queue add', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "group_queue_add",
            'entityObj': {
                'title': 'aaaaaaaaaaa'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                group: {
                    name: 'groupName'
                },
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('groupName');
    });
    it('Should load the notification queue approve', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "group_queue_approve",
            'entityObj': {
                'title': 'aaaaaaaaaaa'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                group: {
                    name: 'groupName'
                },
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('groupName');
    });
    it('Should load the notification queue reject', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "group_queue_reject",
            'entityObj': {
                'title': 'aaaaaaaaaaa'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                group: {
                    name: 'groupName'
                },
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('groupName');
    });
    it('Should load the notification remind', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "remind",
            'entityObj': {
                'type': 'object',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('Title');
    });
    it('Should load the notification remind, without title', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "remind",
            'entityObj': {
                'type': 'object',
                'subtype': 'object',
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('your object');
    });
    it('Should load the notification feature, with title', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "feature",
            'entityObj': {
                'type': 'comment',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('Title');
    });
    it('Should load the notification tag', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "tag",
            'entityObj': {
                'type': 'something',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toBe('name tagged you in a post');
    });
    it('Should load the notification tag', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "tag",
            'entityObj': {
                'type': 'comment',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10,
                parent: {
                    guid: 123
                }
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toBe('name tagged you in a comment');
    });
    it('Should load the notification boost_submitted', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "boost_submitted",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('Title');
    });
    it('Should load the notification boost_submitted', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "boost_submitted",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('Title');
    });
    it('Should load the notification boost_submitted_p2p', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "boost_submitted_p2p",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('Title');
    });
    it('Should load the notification boost_request', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "boost_request",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('Title');
    });
    it('Should load the notification channel_monetized', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "channel_monetized",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                bid: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toContain('<!---->Your channel is now monetized. Congratulations!');
    });
    it('Should load the notification payout_accepted', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "payout_accepted",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                amount: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toContain('<!---->Your payment request for $10.00 was approved.');
    });
    it('Should load the notification payout_declined', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "payout_declined",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                amount: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toContain('<!---->Your payment request for $10.00 was declined.');
    });
    it('Should load the notification rewards summary', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "rewards_summary",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                amount: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toContain('You earned 10 tokens today.');
    });
    it('Should load the notification rewards reminder', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "rewards_reminder",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                left: 'some time'
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toContain('You have some time left to earn tokens today!');
    });
    it('Should load the notification welcome_boost', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "welcome_boost",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                amount: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toBe('You can gain more reach by boosting your content. Hit the blue boost icon on your posts.');
    });
    it('Should load the notification welcome_discover', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "welcome_discover",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                amount: 10
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('span.pseudo-link'));
        expect(notification.nativeElement.innerHTML).toBe('Tap here');
    });
    it('Should load the notification custom_message', function () {
        comp.notification = {
            "type": "notification",
            "guid": "843204301747658770",
            "notification_view": "custom_message",
            'entityObj': {
                'type': 'activity',
                'title': 'Title'
            },
            "fromObj": {
                name: 'name'
            },
            "params": {
                time_created: 2222,
                amount: 10,
                message: 'this is a mesage'
            }
        };
        fixture.detectChanges();
        expect(comp.notification).not.toBeNull();
        var notification = fixture.debugElement.query(platform_browser_1.By.css('p'));
        expect(notification.nativeElement.innerHTML).toBe('this is a mesage');
    });
});
//# sourceMappingURL=notification.component.spec.js.map