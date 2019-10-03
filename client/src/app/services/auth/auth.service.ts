import { Injectable } from '@angular/core';
import { SignInRequest } from 'src/app/requests/sign-in-request';
import { SignUpRequest } from 'src/app/requests/sign-up-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async signIn(req: SignInRequest) {
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

  async signUp(req: SignUpRequest) {
    // TODO
    // Signup with server,
    // Store auth token
    // Send errors for invalid req or server failure
    // redirect to new user page
    // share logic with signin method
  }

}
