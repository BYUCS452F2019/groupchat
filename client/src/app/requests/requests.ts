import { UserInfo } from '../models/models';

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest extends SignInRequest, UserInfo {}

export interface SignOutRequest {
  username: string;
}

export interface CreateConversationRequest {
  name?: string;
  users: string[];
}

export interface LeaveConversationRequest {
  username: string;
  conversationId: string;
}

export interface CreatePostRequest {
  username: string;
  conversationId: string;
  content: string;
}

export interface CreateShortcutRequest {
  username: string;
  pattern;
  effect;
}

export interface DeleteShortcutRequest {
  username: string;
  shortcutId: string;
}