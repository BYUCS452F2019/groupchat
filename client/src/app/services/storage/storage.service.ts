import { Injectable } from '@angular/core';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly AUTH_KEY = 'AUTH_TOKEN';
  private readonly USER_KEY = 'USER_DATA';

  constructor() { }

  getAuthToken() {
    const authToken = localStorage.getItem(this.AUTH_KEY);

    return authToken;
  }

  setAuthToken(authToken: string) {
    try {
      localStorage.setItem(this.AUTH_KEY, authToken);
    } catch (quotaExceededError) {
      console.error('Error saving token, to localStorage', quotaExceededError);
      // TODO this shouldn't be an issue, but use a fallback of some sort if this occurs
    }
  }

  deleteAuthToken() {
    localStorage.removeItem(this.AUTH_KEY);
  }

  getUser() {
    const userString = localStorage.getItem(this.USER_KEY);
    const user: User = JSON.parse(userString);

    return user; 
  }

  setUser(user: User) {
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (quotaExceededError) {
      console.error('Error saving token, to localStorage', quotaExceededError);
      // TODO this shouldn't be an issue, but use a fallback of some sort if this occurs
    }
  }

  deleteUser() {
    localStorage.removeItem(this.USER_KEY);
  }

}
