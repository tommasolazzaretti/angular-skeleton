import {Injectable} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthState} from 'aws-amplify-angular/dist/src/providers/auth.state';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  public isUser?: boolean = null;
  public isOperator?: boolean = null;
  public isAdmin?: boolean = null;
  public isLogged?: boolean = null;

  public cognitoUser: CognitoUser;
  public subject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private amplifyService: AmplifyService, private router: Router) {

  }

  isLoggedLocalStorage() {
    return localStorage.getItem('isLogged');
  }

  authStateChangeCheck() {
    const _self = this;
    this.amplifyService.authStateChange$.subscribe(authState => {

      if (authState.state === 'signedIn') {
        if (authState.user && authState.user.signInUserSession && authState.user.signInUserSession.accessToken.payload) {
          localStorage.setItem('isLogged', 'true');
        }
      } else {
        _self.resetRole();
      }
    });
  }

  private resetRole() {
    this.isUser = false;
    this.isOperator = false;
    this.isAdmin = false;
    this.isLogged = false;
    localStorage.removeItem('isLogged');
  }

  signIn(username: string, password: string): Promise<any> {
    username = username.toLowerCase();
    console.log(username);
    return this.amplifyService.auth()
      .signIn(username.toLowerCase(), password);
  }

  signUp<T extends Attributes>(userData: UserData<T>): Promise<any> {
    userData.username = userData.username.toLowerCase();
    return this.amplifyService.auth().signUp(JSON.parse(JSON.stringify(userData)));
  }

  signOut() {
    this.amplifyService.auth().signOut();
    localStorage.removeItem('isLogged');
  }

  currentUserInfo() {
    return this.amplifyService.auth().currentUserInfo();
  }

  status(): Observable<AuthState> {
    return this.amplifyService.authStateChange$;
  }

  getSession(): Promise<any> {
    return this.amplifyService.auth().currentSession();
  }

  updateUserAttributes(attributes) {
    return this.amplifyService.auth().currentAuthenticatedUser().then(user => {
      return this.amplifyService.auth().updateUserAttributes(user, attributes);
    });
  }

  changePassword(oldPassword: string, newPassword: string): Promise<any> {
    return this.amplifyService.auth().currentAuthenticatedUser()
      .then(user => {
        return this.amplifyService.auth().changePassword(user, oldPassword, newPassword);
      });
  }

  completeNewPassword(user: any, password: string, requiredAttributes?: any): Promise<any> {
    return this.amplifyService.auth().completeNewPassword(user, password, requiredAttributes);
  }

  forgotPassword(username: string): Promise<any> {
    return this.amplifyService.auth().forgotPassword(username);
  }

  forgotPasswordSubmit(username: string, code: string, password: string): Promise<any> {
    return this.amplifyService.auth().forgotPasswordSubmit(username, code, password);
  }

}

export class AttributesBuilder {
  private _BIRTHDATE: string;
  private _PHONE_NUMBER: string; // MUST BE LIKE '+0123456789'
  private _EMAIL: string;
  private _FAMILY_NAME: string;
  private _GIVEN_NAME: string;
  private _GENDER: string;

  public get birthdate(): string {
    return this._BIRTHDATE;
  }

  public setBirthdate(value: string) {
    this._BIRTHDATE = value;
    return this;
  }

  public get phone_number(): string {
    return this._PHONE_NUMBER;
  }

  public setPhone_number(value: string) {
    this._PHONE_NUMBER = value;
    return this;
  }

  public get family_name(): string {
    return this._FAMILY_NAME;
  }

  public setFamily_name(value: string) {
    this._FAMILY_NAME = value;
    return this;
  }

  public get email(): string {
    return this._EMAIL;
  }

  public setEmail(value: string) {
    this._EMAIL = value;
    return this;
  }

  public get given_name(): string {
    return this._GIVEN_NAME;
  }

  public setGiven_name(value: string) {
    this._GIVEN_NAME = value;
    return this;
  }

  public get gender(): string {
    return this._GENDER;
  }

  public setGender(value: string) {
    this._GENDER = value;
    return this;
  }
}

export class UserData<T extends Attributes> {
  username: string;
  password: string;
  attributes: T;
}

export class Attributes {
  birthdate: string;
  phoneNumber: string;
  email: string;
  familyName: string;
  givenName: string;
  gender: string;

  constructor(attributesBuilder: AttributesBuilder) {
    this.birthdate = attributesBuilder.birthdate;
    this.phoneNumber = attributesBuilder.phone_number;
    this.email = attributesBuilder.email;
    this.familyName = attributesBuilder.family_name;
    this.givenName = attributesBuilder.given_name;
    this.gender = attributesBuilder.gender;
  }
}

export enum AuthStates {
  signIn = 'signIn',
  signUp = 'signUp',
  confirmSignIn = 'confirmSignIn',
  confirmSignUp = 'confirmSignUp',
  forgotPassword = 'forgotPassword',
  verifyContact = 'verifyContact',
  signedIn = 'signedIn'
}
