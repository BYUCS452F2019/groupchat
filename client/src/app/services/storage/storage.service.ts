import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly KEY = 'AUTH_TOKEN';

  constructor() { }

  getAuthToken() {
    const authToken = localStorage.getItem(this.KEY);

    return authToken;
  }

  setAuthToken(authToken: string) {
    try {
      localStorage.setItem(this.KEY, authToken);
    } catch (quotaExceededError) {
      console.error('Error saving token, to localStorage', quotaExceededError);
      // TODO this shouldn't be an issue, but use a fallback of some sort if this occurs
    }
  }

  deleteAuthToken() {
    localStorage.removeItem(this.KEY);
  }

}
