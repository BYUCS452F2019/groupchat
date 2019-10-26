import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor() { }

  async getUserConversations() {
    // TODO get current username
    // send server request to get conversations with this username
    // return all conversations
  }

  async getConversationDetails(conversationId: string) {
    // TODO this involves getting the recent posts for the conversation as well
    // participants, recent posts (user data for each participant as well)
  }

  async createConversation(name: string, users: string[]) {

  }

  async leaveConversation(conversationId: string) {
    // If one person leaves, the other person should be able to see it still
  }

  async postToConversation(content: string) {
    // TODO offload responsibility to make the request to postService
    //
  }

}
