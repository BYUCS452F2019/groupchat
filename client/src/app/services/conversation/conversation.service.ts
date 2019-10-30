import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ServerService } from '../server/server.service';
import { CreateConversationRequest } from 'src/app/requests/requests';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private storage: StorageService, private server: ServerService) { }

  async getUserConversations() {
    // TODO get current username
    // send server request to get conversations with this username
    // return all conversations
  }

  async getConversationDetails(conversationId: string) {
    // TODO this involves getting the recent posts for the conversation as well
    // participants, recent posts (user data for each participant as well)
  }

  createConversation(name: string, participants: string[]) {
    const username = ''//this.storage.getUser().username;

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

  async leaveConversation(conversationId: string) {
    // If one person leaves, the other person should be able to see it still
  }

  async postToConversation(content: string) {
    // TODO offload responsibility to make the request to postService
    //
  }

}
