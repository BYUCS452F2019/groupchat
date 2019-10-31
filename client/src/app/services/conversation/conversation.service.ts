import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ServerService } from '../server/server.service';
import { CreateConversationRequest } from 'src/app/requests/requests';
import { map } from 'rxjs/operators';
import { PostService } from '../post/post.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private storage: StorageService, private server: ServerService, private post: PostService, private utility: UtilityService) { }

  getUserConversations() {
    const username = this.storage.getUser().username;

    return this.server.getUserConversations(username).pipe(
      map((getUserConversationsResponse) => {
        if (!!getUserConversationsResponse) {
          return getUserConversationsResponse.conversations;
        } else {
          return; // nothing
        }
      })
    );
  }

  getConversationDetails(conversationId: string) {
    return this.server.getConversationDetails(conversationId).pipe(
      map((getConversationDetailsResponse) => {
        if (!!getConversationDetailsResponse) {
          let c = getConversationDetailsResponse.conversation;
          c.posts.map(this.utility.augmentTimestamp); //convert timestamps to date objects

          return c;
        } else {
          return; // nothing
        }
      })
    );
  }

  createConversation(name: string, participants: string[]) {
    const username = this.storage.getUser().username;

    const createConversationRequest: CreateConversationRequest = {
      name,
      participants: [username,...participants]
    }

    return this.server.createConversation(createConversationRequest).pipe(
      map((createConversationResponse) => {
        if (!!createConversationResponse) {
          return createConversationResponse.conversation;
        } else {
          return; //nothing
        }
      })
    )
  }

  leaveConversation(conversationId: string) {
    // TODO not essential for MVP
    // If one person leaves, the other person should be able to see it still
  }

  postToConversation(conversationId: string, content: string) {
    return this.post.createPost(conversationId, content);
  }

}
