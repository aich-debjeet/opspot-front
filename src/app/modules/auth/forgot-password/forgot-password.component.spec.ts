import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { clientMock } from '../../../../tests/client-mock.spec';
import { opspotTitleMock } from '../../../mocks/services/ux/opspot-title.service.mock.spec';
import { OpspotTitle } from '../../../services/ux/title';
import { sessionMock } from '../../../../tests/session-mock.spec';
import { Session } from '../../../services/session';
import { Client } from '../../../services/api/client';
import { NgxIntlTelInputModule }  from 'ngx-intl-tel-input';
import { MockDirective } from '../../../utils/mock';

@Component({
  selector: '',
  template: ''
})
class BlankComponent {
  @Input() referrer: string;
  @Output() done: EventEmitter<any> = new EventEmitter<any>();
}

// describe('ForgotPasswordComponent', () => {

//   let comp: ForgotPasswordComponent;
//   let fixture: ComponentFixture<ForgotPasswordComponent>;

//   function getUsernameInput(): DebugElement {
//     return fixture.debugElement.query(By.css('input#username'));
//   }

//   function getContinueButton(): DebugElement {
//     return fixture.debugElement.query(By.css('.m-forgot-password--step-1 button'));
//   }

//   function getResetButton(): DebugElement {
//     return fixture.debugElement.query(By.css('.m-forgot-password--step-3 button'));
//   }

//   function getPassword1Input(): DebugElement {
//     return fixture.debugElement.query(By.css('input#password'));
//   }


//   function getPassword2Input(): DebugElement {
//     return fixture.debugElement.query(By.css('input#password2'));
//   }


//   beforeEach(async(() => {

//     TestBed.configureTestingModule({
//       declarations: [MockDirective({selector: '[mdl]', inputs: ['mdl']}), BlankComponent, ForgotPasswordComponent],
//       imports: [RouterTestingModule.withRoutes([{ path: 'newsfeed', component: BlankComponent }]), ReactiveFormsModule],
//       providers: [
//         { provide: Session, useValue: sessionMock },
//         { provide: Client, useValue: clientMock },
//         { provide: OpspotTitle, useValue: opspotTitleMock },
//       ]
//     })
//       .compileComponents();
//   }));

//   // synchronous beforeEach
//   beforeEach(() => {
//     jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
//     fixture = TestBed.createComponent(ForgotPasswordComponent);

//     comp = fixture.componentInstance;

//     clientMock.response = {};

//     fixture.detectChanges();
//   });

//   it('should have a prompt to enter your username', () => {
//     const prompt = fixture.debugElement.query(By.css('.m-forgot-password--step-1 .mdl-card__supporting-text'));
//     expect(prompt).not.toBeNull();
//     expect(prompt.nativeElement.textContent).toContain('To request a new password, enter your username');
//   });

//   it('should have a username input and a continue button', () => {
//     expect(getUsernameInput()).not.toBeNull();
//     const button = getContinueButton();
//     expect(button).not.toBeNull();
//     expect(button.nativeElement.textContent).toContain('Continue');
//   });
//   it('should move to step 2 after clicking on continue', fakeAsync(() => {
//     spyOn(comp, 'request').and.callThrough();
//     const url = 'api/v1/forgotpassword/request';

//     clientMock.response[url] = { status: 'success' };

//     const input = getUsernameInput();
//     input.nativeElement.value = 'test';
//     input.nativeElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     getContinueButton().nativeElement.click();
//     jasmine.clock().tick(10);
//     tick();
//     fixture.detectChanges();

//     expect(comp.request).toHaveBeenCalled();
//     expect(clientMock.post).toHaveBeenCalled();
//     expect(clientMock.post.calls.mostRecent().args[0]).toBe(url);
//     expect(clientMock.post.calls.mostRecent().args[1]).toEqual({ username: 'test' });
//     expect(comp.step).toBe(2);
//   }));

//   it('should prompt the user that an email with the code has been sent on step 2', () => {
//     comp.step = 2;
//     fixture.detectChanges();

//     const prompt = fixture.debugElement.query(By.css('.m-forgot-password--step-2 .mdl-card__supporting-text'));
//     expect(prompt).not.toBeNull();
//     expect(prompt.nativeElement.textContent).toContain('We have sent an unlock code to your registered email address.');
//   });

//   it('should allow the user to change its password in step 3', fakeAsync(() => {
//     comp.step = 3;
//     comp.username = 'test';
//     comp.code = 'code';

//     fixture.detectChanges();

//     const prompt = fixture.debugElement.query(By.css('.m-forgot-password--step-3 .mdl-card__supporting-text'));
//     expect(prompt).not.toBeNull();
//     expect(prompt.nativeElement.textContent).toContain('Please enter your new password');

//     const input1 = getPassword1Input();
//     expect(input1).not.toBeNull();

//     const input2 = getPassword2Input();
//     expect(input2).not.toBeNull();

//     input1.nativeElement.value = '123456';
//     input1.nativeElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     input2.nativeElement.value = '123456';
//     input2.nativeElement.dispatchEvent(new Event('input'));
//     input2.nativeElement.dispatchEvent(new Event('keyup'));

//     fixture.detectChanges();

//     clientMock.post.calls.reset();
//     const url = 'api/v1/forgotpassword/reset';
//     clientMock.post[url] = { 'status': 'success' };

//     getResetButton().nativeElement.click();
//     jasmine.clock().tick(10);
//     tick();
//     fixture.detectChanges();

//     expect(clientMock.post).toHaveBeenCalled();
//     const args = clientMock.post.calls.mostRecent().args;
//     expect(args[0]).toBe(url);
//     expect(args[1]).toEqual({ password: '123456', code: 'code', username: 'test' });
//     expect(sessionMock.login).toHaveBeenCalled();
//   }));

// });

describe('Forgot password component', ()=>{
    let component: ForgotPasswordComponent;
    let fixture: ComponentFixture<ForgotPasswordComponent>;
    let phoneInput: DebugElement;
    let resetMobileButton: DebugElement;
    let emailInput: DebugElement;
    let resetEmailButton: DebugElement;

    beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [MockDirective({selector: '[mdl]', inputs: ['mdl']}), BlankComponent, ForgotPasswordComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'newsfeed', component: BlankComponent }]), ReactiveFormsModule, FormsModule, NgxIntlTelInputModule],
      providers: [
        { provide: Session, useValue: sessionMock },
        { provide: Client, useValue: clientMock },
        { provide: OpspotTitle, useValue: opspotTitleMock },
      ]
    })
      .compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
    fixture = TestBed.createComponent(ForgotPasswordComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

    phoneInput = fixture.debugElement.query(By.css('ngx-intl-tel-input[name=phone]'));
    resetMobileButton = fixture.debugElement.query(By.css('#phone_reset'));
    emailInput = fixture.debugElement.query(By.css('input[name=email]'));
    resetEmailButton = fixture.debugElement.query(By.css('#email_reset'));
    
  });

  it('should be created', ()=>{
    expect(component).toBeTruthy();
  });

  it('should have an phone input field',()=>{
    expect(phoneInput).toBeDefined();
  });

  it('should have a reset button for mobile number defined', ()=> {
    expect(resetMobileButton).toBeDefined();
  });

  it('should have a placeholder for email input defined', ()=>{
    expect(emailInput).toBeDefined();
  })

  it('should create a FormGroup for phone number reset password comprised of FormControls', () => {
    component.buildForm('mobile');
    expect(component.mobileForm instanceof FormGroup).toBe(true);
  });

  it('form should be invalid on absence of data in form for phone',()=>{
    component.mobileForm.controls['mobileInput'].setValue('');
    expect(component.mobileForm.valid).toBeFalsy();
  })
  it('phone number field validity',()=>{
    let errors ={};
    let phone = component.mobileForm.controls['mobileInput']
    
    expect(phone.valid).toBeFalsy();

    errors = phone.errors || {};
    expect(errors['required']).toBeTruthy();

    phone.setValue('7022539494');
    errors = phone.errors || {};
    expect(errors['required']).toBeFalsy();
  })

  it('click events on phone text should initialize form with phone inputs field for updating password through phone.', ()=>{
    component.step = 0;
    expect(component.step).toBe(0);
    spyOn(component,'showView').and.callThrough();
    let textPhone = fixture.debugElement.query(By.css('#textPhone'))
    textPhone.nativeElement.click();
    component.showView(0);
    fixture.whenStable().then(()=> {
      expect(component.showView).toHaveBeenCalled();
      expect(component.step).toBe(0);
    })
  });

  it('click events on email text should should initialize form with email inputs field for updating password through email.', ()=>{
    component.step = 0;
    expect(component.step).toBe(0);
    spyOn(component,'showView').and.callThrough();
    let textEmail = fixture.debugElement.query(By.css('#textEmail'))
    textEmail.nativeElement.click();
    component.showView(1);
    fixture.whenStable().then(()=> {
      expect(component.showView).toHaveBeenCalled();
      expect(component.step).toBe(1);
    })
  });
  it('reset button should be invalid initially when resetting password with phone',()=>{
    spyOn(component, 'buildForm').and.callThrough();
    component.step = 0;
    component.buildForm('mobile');
    fixture.whenStable().then(()=>{
      expect(component.mobileForm.valid).toBeFalsy();
      expect(resetMobileButton.nativeElement.disabled).toBeTruthy();
    })
  })

  it('reset button should be enabled when phone number field is valid', ()=>{
    spyOn(component, 'buildForm').and.callThrough();
    component.step = 0;
    component.inProgress = false;
    component.buildForm('mobile');
    component.mobileForm.controls['mobileInput'].setValue('7022539494');
    fixture.whenStable().then(()=>{
      expect(component.mobileForm.valid).toBeTruthy();
      expect(resetMobileButton.nativeElement.disabled).toBeFalsy();
    })
  })

  it('form should be valid on valid fields',()=>{
    spyOn(component, 'buildForm').and.callThrough();
    component.step = 0;
    component.buildForm('mobile');
    component.mobileForm.controls['mobileInput'].setValue('7022539494');
    fixture.whenStable().then(()=>{
      expect(component.mobileForm.valid).toBeTruthy();
    })
  })

  it('form should be valid on valid fields and click on reset button should trigger respective methods',fakeAsync(()=>{
    spyOn(component, 'buildForm').and.callThrough();
    spyOn(component, 'requestMobile');
    component.step = 0;
    component.buildForm('mobile');
    component.mobileForm.controls['mobileInput'].setValue('7022539494');
    resetMobileButton.nativeElement.click();

    fixture.whenStable().then(()=>{
      expect(component.mobileForm.valid).toBeTruthy();
      expect(component.requestMobile).toHaveBeenCalled();
    })
  }))
  // email form for resetting password

  it('should create a FormGroup for email reset password comprised of FormControls', () => {
    component.buildForm('email');
    expect(component.emailForm instanceof FormGroup).toBe(true);
  });

  it('form should be invalid on absence of data in form for email',()=>{
    component.buildForm('email');
    component.emailForm.controls['emailInput'].setValue('');
    expect(component.mobileForm.valid).toBeFalsy();
  })
  it('email field validity',()=>{
    component.buildForm('email');
    let errors ={};
    let email = component.emailForm.controls['emailInput']
    
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('7022539494');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
  })

  it('click events on phone text should initialize form with email inputs field for updating password through email.', ()=>{
    component.step = 1;
    expect(component.step).toBe(1);
    spyOn(component,'showView').and.callThrough();
    let textPhone = fixture.debugElement.query(By.css('#textPhone'))
    textPhone.nativeElement.click();
    component.showView(0);
    fixture.whenStable().then(()=> {
      expect(component.showView).toHaveBeenCalled();
      expect(component.step).toBe(0);
    })
  });

  it('click events on email text should should initialize form with email inputs field for updating password through email.', ()=>{
    component.step = 1;
    expect(component.step).toBe(1);
    spyOn(component,'showView').and.callThrough();
    let textEmail = fixture.debugElement.query(By.css('#textEmail'))
    textEmail.nativeElement.click();
    component.showView(1);
    fixture.whenStable().then(()=> {
      expect(component.showView).toHaveBeenCalled();
      expect(component.step).toBe(1);
    })
  });
  it('reset button should be invalid initially when resetting password with email',()=>{
    spyOn(component, 'buildForm').and.callThrough();
    component.step = 1;
    component.buildForm('email');
    fixture.whenStable().then(()=>{
      expect(component.emailForm.valid).toBeFalsy();
      expect(resetEmailButton.nativeElement).toBeTruthy();
      expect(resetEmailButton.nativeElement.disabled).toBeTruthy();
    })
  })

  it('reset button should be valid when email field is valid', ()=>{
    component.step = 1;
    spyOn(component, 'buildForm').and.callThrough();
    component.buildForm('email');
    component.inProgress = false;
    component.emailForm.controls['emailInput'].setValue('debjeet.aich@aeione.com');
    fixture.whenStable().then(()=>{
      expect(component.emailForm.valid).toBeTruthy();
      expect(resetEmailButton.nativeElement.disabled).toBeFalsy();
      expect(resetEmailButton.nativeElement).toBeTruthy();
    })
  })

  it('form should be valid on valid fields for email resetting password',()=>{
    spyOn(component, 'buildForm').and.callThrough();
    component.step = 1;
    component.buildForm('email');
    component.emailForm.controls['emailInput'].setValue('debjeet.aich@aeione.com');
    fixture.whenStable().then(()=>{
      expect(component.emailForm.valid).toBeTruthy();
      expect(resetEmailButton.nativeElement).toBeTruthy();
    })
  })

  // it('form should be valid on valid fields and click on reset button should trigger respective methods for email resetting of password',fakeAsync(()=>{
  //   component.step = 1;
  //   spyOn(component, 'buildForm').and.callThrough();
  //   spyOn(component, 'requestEmail');
  //   component.buildForm('email');
  //   component.emailForm.controls['emailInput'].setValue('debjeet.aich@aeione.com');
  //   expect(resetEmailButton.nativeElement).toBeTruthy();
  //   resetEmailButton.nativeElement.click();

  //   fixture.whenStable().then(()=>{
  //     expect(component.emailForm.valid).toBeTruthy();
  //     expect(component.requestEmail).toHaveBeenCalled();
  //   })
  // }))

  it('step 3',()=>{
    component.step = 3;
    const ele: HTMLElement = fixture.debugElement.query(By.css('#awesome')).nativeElement
    expect(ele.textContent).toContain('Awesome :)')
    expect(component.step).toBe(3);
  })
})