import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { LoginForm } from './login';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Client } from '../../../services/api/client';
import { By } from '@angular/platform-browser';
import { Session } from '../../../services/session';
import { clientMock } from '../../../../tests/client-mock.spec';
import { sessionMock } from '../../../../tests/session-mock.spec';
import { MockDirective } from '../../../utils/mock';

describe('LoginForm',()=>{
  let fixture:ComponentFixture<LoginForm>; //definig the fixture
  let component: LoginForm;
  let session: Session;
  let username: DebugElement;
  let password: DebugElement;
  let loginButton: DebugElement;
  let forgotPassword: HTMLElement;
  let errorMessage: DebugElement;
  let invalidUserErr: DebugElement;

  function login(response) {
    username.nativeElement.value = 'username';
    username.nativeElement.dispatchEvent(new Event('input'));
    password.nativeElement.value = 'password';
    password.nativeElement.dispatchEvent(new Event('input'));

    clientMock.post.calls.reset();

    clientMock.response['api/v1/authenticate'] = response;

    tick();
    fixture.detectChanges();

    loginButton.nativeElement.click();
    tick();
    fixture.detectChanges();
  }

  //Asynchronous beforeEach
  beforeEach(async(()=>{
    TestBed.configureTestingModule({
        declarations: [LoginForm], // declare the test component
        imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
        providers: [
          { provide: Session, useValue: sessionMock },
          { provide: Client, useValue: clientMock }
        ]
      })
        .compileComponents()  // compile external template and css
        .then(()=>{
          fixture = TestBed.createComponent(LoginForm); //creat component and test fixture. CreateComponent method returns a component Fixure.

          component = fixture.componentInstance; //get test component from fixture
      
          fixture.detectChanges(); //detect changes when the component first becomes initialized 
          session = component.session;

          username = fixture.debugElement.query(By.css('input[formControlName=username]'));
          password = fixture.debugElement.query(By.css('input[formControlName=password]'));
          loginButton = fixture.debugElement.query(By.css('button'));
          forgotPassword = fixture.debugElement.query(By.css('a.float-right.text-sm.primary')).nativeElement;
          errorMessage = fixture.debugElement.query(By.css('error text-sm'));
          invalidUserErr = fixture.debugElement.query(By.css('#invalid-user'));
        });
  }))

  it('should be created', ()=>{
    expect(component).toBeTruthy();
  });

  it('should have an username input field',()=>{
    expect(username).toBeDefined();
  })

  it('should have a password input field', ()=>{
    expect(password).toBeDefined();
  })

  it('should have a login button',()=>{
    expect(loginButton).toBeDefined();
  })

  it('should contain forgot password', ()=>{
    expect(forgotPassword.textContent).toContain('Forgot Password?')
  })

  // it('error message should be hidden by default', ()=>{
  //   component.submitted = true;
  //   component.f.username.errors.required = true;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.query(By.css('error text-sm')).nativeElement.textContent.hidden).toBeTruthy();
  //   // component.submitted = true;
  //   // component.f.username.errors.required = true;
  //   // fixture.detectChanges();
  //   // loginButton.triggerEventHandler('click', null);
  //   // fixture.detectChanges();
  //   // const value = fixture.debugElement.query(By.css('uReqMsg')).nativeElement.textContent;
  //   // expect(value).toEqual('Username is required');
  // })

  it('should\'ve called api/v1/authenticate with correct arguments', fakeAsync(() => {
    login({
      'status': 'success',
      'user': {
        'guid': '714452562123689992',
        'type': 'user',
        'subtype': false,
        'time_created': '1495714764',
        'time_updated': false,
        'container_guid': '0',
        'owner_guid': '0',
        'site_guid': false,
        'access_id': '2',
        'name': 'opspot',
        'username': 'opspot',
        'language': 'en',
        'icontime': '1496687850',
        'legacy_guid': false,
        'featured_id': false,
        'banned': 'no',
        'website': false,
        'briefdescription': false,
        'dob': false,
        'gender': false,
        'city': false,
        'merchant': false,
        'boostProPlus': false,
        'fb': false,
        'mature': 0,
        'monetized': false,
        'signup_method': false,
        'social_profiles': [],
        'feature_flags': false,
        'chat': true,
        'subscribed': false,
        'subscriber': false,
        'subscriptions_count': 1,
        'impressions': 0,
        'boost_rating': '2'
      }
    });
    const calls = clientMock.post['calls'];
    expect(calls.count()).toEqual(1);
    expect(calls.mostRecent().args[0]).toEqual('api/v1/authenticate');
    expect(calls.mostRecent().args[1]).toEqual({ 'username': 'username', 'password': 'password' });
  }));

  it('should authenticate on correct credentials', fakeAsync(() => {
    spyOn(component, 'login').and.callThrough();
    login({
      'status': 'success',
      'user': {
        'guid': '714452562123689992',
        'type': 'user',
        'subtype': false,
        'time_created': '1495714764',
        'time_updated': false,
        'container_guid': '0',
        'owner_guid': '0',
        'site_guid': false,
        'access_id': '2',
        'name': 'opspot',
        'username': 'opspot',
        'language': 'en',
        'icontime': '1496687850',
        'legacy_guid': false,
        'featured_id': false,
        'banned': 'no',
        'website': false,
        'briefdescription': false,
        'dob': false,
        'gender': false,
        'city': false,
        'merchant': false,
        'boostProPlus': false,
        'fb': false,
        'mature': 0,
        'monetized': false,
        'signup_method': false,
        'social_profiles': [],
        'feature_flags': false,
        'chat': true,
        'subscribed': false,
        'subscriber': false,
        'subscriptions_count': 1,
        'impressions': 0,
        'boost_rating': '2'
      }
    });
    expect(component.login).toHaveBeenCalled();
  }));

  it('should be invalid and button should be disabled',()=>{
    component.form.controls['username'].setValue('');
    component.form.controls['password'].setValue('');
    expect(component.form.valid).toBeFalsy();
    
    //update view once the values are enterd

    fixture.detectChanges();
    expect(loginButton.nativeElement.disabled).toBeTruthy(); //check if it is disabled
  })
  
  it('should have a valid username, should trigger error msg when username is empty, should not trigger error message if username is not empty',()=>{
    let errors ={}
    let userName = component.form.controls['username'];
    expect(userName.valid).toBeFalsy();

    //username field is required
    errors = userName.errors || {};
    expect(errors['required']).toBeTruthy();

    //setting value for username should not trigger error msgs
    userName.setValue("test");
    errors = userName.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('should have a valid password, should trigger error msg when password is empty, should not trigger error message if password is not empty',()=>{
    let errors ={}
    let password=component.form.controls['password'];
    expect(password.valid).toBeFalsy();

    //password required validation
    errors = password.errors || {}
    expect(errors['required']).toBeTruthy();

    //setting value for password should not trigger error msgs
    password.setValue("password");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should hide error messages by default', ()=>{
    expect(errorMessage).toBeNull();
  })

  it('should spawn error message on incorrect credentials', fakeAsync(() => {
    login({ 'status': 'failed' });
    tick();
    fixture.detectChanges();
    expect(invalidUserErr.nativeElement.hidden).toBeFalsy();
  }));

  it('login should be successful', fakeAsync(()=>{
    login({'status': 'success'});
    tick();
    fixture.detectChanges();
    expect(invalidUserErr.nativeElement.hidden).toBeTruthy();
  }))
})