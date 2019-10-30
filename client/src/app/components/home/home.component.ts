import { Component, OnInit, OnDestroy } from '@angular/core';
import { VisualService } from 'src/app/services/visual/visual.service';
import { NewConversationComponent } from '../new-conversation/new-conversation.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { Conversation, ConversationInfo } from '../../models/models';
import { ConversationService } from 'src/app/services/conversation/conversation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public opened = true;
  public conversations: ConversationInfo[] = [];
  public selectedConversationId: string = '';

  constructor(private visual: VisualService, private auth: AuthService, private storage: StorageService, private router: Router, private conversation: ConversationService) { }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/start');
      }
    });
    this.auth.isAuthenticated.next(!!this.storage.getAuthToken());

    // TODO subscribe to this and update conversations on change by polling and calling next on this
    //this.conversation.getUserConversations();
    // also set conversationId to first or most recent conversation
  }

  ngOnDestroy() {
    this.auth.isAuthenticated.unsubscribe();
  }

  newConversation() {
    const dialogRef = this.visual.displayModal(NewConversationComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((conversation: Conversation) => {
      console.log("newConversation: ", conversation);

      // not needed because of subscribing
      // const conversationInfo: ConversationInfo = {
      //   conversationId: conversation.conversationId,
      //   name: conversation.name
      // }

      this.selectedConversationId = conversation.conversationId;
    });
  }

}
