import { Injectable } from '@angular/core';
import { UserInfo } from '../../models/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async signIn(username: string, password: string) {
    // TODO
    // Authenticate with server
    // Store auth token
    // Send errors for invalid req or server failure    
    // redirect to home page
  }

  async signOut() {
    // TODO
    // Tell server to delete auth token
    // delete auth token from local storage
    // redirect to start page
    // ignore errors from server with regards to deleting token
  }

  async signUp(username: string, password: string, userInfo: UserInfo) {
    // TODO
    // Signup with server,
    // Store auth token
    // Send errors for invalid req or server failure
    // redirect to new user page
    // share logic with signin method
  }

}
