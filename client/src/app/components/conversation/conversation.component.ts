import { Component, OnInit, Input } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { Post } from 'src/app/models/models';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { timer } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  public name: string;
  public participants: string[];
  public posts: Post[];
  private _conversationId: string;

  @Input() set conversationId(value: string) {
    this._conversationId = value;

    this.initConversation();
  }

  get conversationId(): string {
    return this._conversationId;
  }

  constructor(private conversation: ConversationService, private utility: UtilityService) { }

  ngOnInit() {
    // get the conversation by id and display if not null

    // TODO add method to conversation service to subscribe to updates
    // for now, updates will just be sending a timestamp and getting all posts
    // created since that time
    // we should create an intersection so that there are no duplicates
    this.conversation.getConversationDetails(this.conversationId)
  }

  initConversation() {
    timer(0, 1000).pipe(
      mergeMap(() => {
        return this.conversation.getConversationDetails(this.conversationId);
      }),
      map((conversation) => {
        this.name = conversation.name;
        this.participants = conversation.participants;
        this.posts = conversation.posts;
      })
    );
  }

  createPost(text: string) {
    this.conversation.postToConversation(this.conversationId, text).subscribe((post) => {
      this._addPosts([post]);
    });
  }

  trackByPostIdFn(index, post: Post) {
    return post.postId;
  }

  private _addPosts(posts: Post[]) {
    this.posts = this.utility.unique([...this.posts, ...posts], 'postId', 'timestamp');
  }

}
