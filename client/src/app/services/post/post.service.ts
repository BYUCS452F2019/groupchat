import { Injectable } from '@angular/core';
import { Post } from '../../models/models';
import { ServerService } from '../server/server.service';
import { CreatePostRequest } from 'src/app/requests/requests';
import { StorageService } from '../storage/storage.service';
import { map } from 'rxjs/operators';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private server: ServerService, private storage: StorageService, private utility: UtilityService) { }

  createPost(conversationId: string, content: string) {
    const username = this.storage.getUser().username;

    const createPostRequest: CreatePostRequest = {
      username,
      conversationId,
      content
    }

    return this.server.createPost(createPostRequest).pipe(
      map((createPostResponse) => {
        if (!!createPostResponse) {
          let p = createPostResponse.post;
          this.utility.augmentTimestamp(p);

          return p;
        } else {
          return; // nothing
        }
      })
    )
  }

  deletePost(postId: string) {
    // TODO not needed for MVP
  }

  processPost(post: Post) {
    // TODO not needed for MVP, this may not be needed at all if processed on the backend
    // TODO process the post content and apply shortcuts, returning
    // the post content to actually be embedded 
  }
  /*
    TODO take the message, and get all shortcuts, for each apply
    it and get the results, return the final message content
  */

}