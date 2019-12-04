export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl?: string;
}

export interface User extends UserInfo {
  username: string;
}

export interface Post {
  postId: string;
  conversationId: string;
  username: string;
  content: string;
  timestamp: Date;
}

export interface ConversationInfo {
  conversationId: string;
  name: string;
}

export interface Conversation extends ConversationInfo {
  participants: string[];
  posts: Post[];
}

export interface Shortcut {
  shortcutId: string;
  pattern: string;
  username: string;
  command: string;
}