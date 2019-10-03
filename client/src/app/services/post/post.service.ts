import { Injectable } from '@angular/core';
import { CreatePostRequest } from 'src/app/requests/post-request';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  createPost(req: CreatePostRequest) {

  }

  deletePost(postId: string) {

  }

  processPost(post: Post) {
    // TODO process the post content and apply shortcuts, returning
    // the post content to actually be embedded 
  }
  /*
    TODO take the message, and get all shortcuts, for each apply
    it and get the results, return the final message content
  */

}
