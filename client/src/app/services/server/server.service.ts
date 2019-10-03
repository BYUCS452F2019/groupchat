import { Injectable } from '@angular/core';
import { SignInRequest } from 'src/app/requests/sign-in-request';
import { SignUpRequest } from 'src/app/requests/sign-up-request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';


interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: "body";
  params?: HttpParams | {
    [param: string]: string | string[];
  };
}


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly BASE_URL = ''

  constructor(private http: HttpClient, private storage: StorageService) { }

  /* Feed Requests */

  // TODO some requests will be performed with websockets or polling, to get constant
  // updates on the current conversation(s) this will be some sort of subscription, e.g. get the last few posts

  /* Auth Service Requests */

  signIn(req: SignInRequest) {
    const url = `${this.BASE_URL}/auth/signin`;
    
    return this._post(url, req) as Observable<SignInResponse>;
  }

  signUp(req: SignUpRequest) {
    const url = `${this.BASE_URL}/auth/signup`;

    return this._post(url, req) as Observable<SignUpResponse>;
  }

  signOut(req: SignOutRequest) {
    const url = `${this.BASE_URL}/auth/signout`;

    return this._post(url, req) as Observable<SignOutResponse>;
  }

  /* Conversation Requests */

  getUserConversations(username: string) {
    const url = `${this.BASE_URL}/conversation/user/${username}`;

    return this._get(url) as Observable<GetUserConversationsResponse>;
  }

  getConversationDetails(conversationId: string) {
    const url = this._formUrl(`conversation/details/${conversationId}`);

    return this._get(url) as Observable<GetConversationDetailsResponse>;
  }

  createConversation(req: ConversationRequest) {
    const url = this._formUrl('conversation/create');

    return this._post(url, req) as Observable<CreateConversationResponse>;
  }

  leaveConversation(req: LeaveConversationRequest) {
    const url = this._formUrl('conversation/leave');

    return this._post(url, req) as Observable<LeaveConversationResponse>;
  }

  /* Post Requests */

  createPost(req: CreatePostRequest) {
    const url = this._formUrl('post/create');

    return this._post(url, req) as Observable<CreatePostResponse>;
  }

  deletePost(postId: string) {
    const url = this._formUrl(`post/delete/${postId}`);

    return this._get(url) as Observable<DeletePostResponse>;
  }

  /* Shortcut Requests */

  getUserShortcuts(username: string) {
    const url = this._formUrl(`shortcut/user/${username}`);

    return this._get(url) as Observable<GetUserShortcutsResponse>;
  }

  createShortcut(req: CreateShortcutRequest) {
    const url = this._formUrl('shortcut/create');

    return this._post(url, req) as Observable<CreateShortcutResponse>;
  }

  deleteShortcut(shortcutId: string) {
    const url = this._formUrl('shortcut/delete');

    return this._post(url, req) as Observable<DeleteShortcutResponse>;
  }

  /* Helper Methods */

  private _get(url: string, options?: HttpOptions): Observable<any> {
    const augmentedOptions = this._addAuthorizationHeader(options);

    return this.http.get(url, augmentedOptions).pipe(
      tap((res) => {
        console.debug(`get: ${url}`, 
                      `options sent: ${options}`, 
                      `response: ${res}`);
      })
    );
  }

  private _post(url: string, req: any, options?: HttpOptions): Observable<any> {
    const augmentedOptions = this._addAuthorizationHeader(options);

    return this.http.post(url, req, augmentedOptions).pipe(
      tap((res) => {
        console.debug(`post to: ${url}`, 
                      `request sent: ${req}`, 
                      `options sent: ${options}`, 
                      `response: ${res}`);
      })
    );
  }

  private _formUrl(path: string) {
    return `${this.BASE_URL}/path`;
  }

  private _addAuthorizationHeader(options?: HttpOptions) {
    options = options || {};

    const authToken = this.storage.getAuthToken();

    if (!options.headers) {
      options.headers = new HttpHeaders({ authorization: authToken});
    }

    return options;
  }

}
