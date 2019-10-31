import { Injectable } from '@angular/core';
import { UserInfo } from '../../models/models';
import { Subject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { ServerService } from '../server/server.service';
import { SignInRequest, SignUpRequest, SignOutRequest } from '../../requests/requests';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: Subject<boolean>;

  constructor(private storage: StorageService, private server: ServerService) {
    this.isAuthenticated = new Subject();
  }

  ngOnInit() {
    const token = this.storage.getAuthToken();
    this.isAuthenticated.next(!!token);
  }

  signIn(username: string, password: string) {
    const signInRequest: SignInRequest = {
      username,
      password
    }

    return this.server.signIn(signInRequest).pipe(
      tap((signInResponse) => {
        if (!!signInResponse) {
          this.storage.setAuthToken(signInResponse.authToken);
          this.storage.setUser(signInResponse.user);

          this.isAuthenticated.next(true);
        }
      })
    );
  }

  signOut() {
    const username = this.storage.getUser().username;

    const signOutRequest: SignOutRequest = {
      username
    }

    // we aren't concerned if this succeeded or not on the frontend
    this.server.signOut(signOutRequest);

    this.storage.deleteAuthToken();
    this.isAuthenticated.next(false);
  }

  signUp(username: string, password: string, userInfo: UserInfo) {
    const signUpRequest: SignUpRequest = {
      username,
      password,
      ...userInfo
    }

    return this.server.signUp(signUpRequest).pipe(
      tap((signUpResponse) => {
        if (!!signUpResponse) {
          this.storage.setAuthToken(signUpResponse.authToken);
          this.storage.setUser(signUpResponse.user);

          this.isAuthenticated.next(true);
        }
      })
    );
  }

}
