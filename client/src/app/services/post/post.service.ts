import { Injectable } from '@angular/core';
import { Post } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  createPost(content: string) {

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