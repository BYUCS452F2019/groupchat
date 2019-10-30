import { Post, User, ConversationInfo, Conversation, Shortcut } from '../models/models';

export interface SignInResponse {
  user: User;
  authToken: string;
}

export interface SignUpResponse {
  user: User;
  authToken: string;
}

export interface SignOutResponse {
  success: boolean;
}

export interface GetUserConversationsResponse {
  conversations: ConversationInfo[];
}

export interface GetConversationDetailsResponse {
  conversation: Conversation;
}

export interface CreateConversationResponse {
  conversation: Conversation;
}

export interface LeaveConversationResponse {
  success: boolean;
}

export interface CreatePostResponse {
  post: Post;
}

export interface DeletePostResponse {
  success: boolean;
}

export interface GetUserShortcutsResponse {
  shortcuts: Shortcut[];
}

export interface CreateShortcutResponse {
  shortcut: Shortcut;
}

export interface DeleteShortcutResponse {
  success: boolean;
}