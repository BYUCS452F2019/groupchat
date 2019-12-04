import { Component, OnInit, OnDestroy } from '@angular/core';
import { VisualService } from 'src/app/services/visual/visual.service';
import { NewConversationComponent } from '../new-conversation/new-conversation.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { ConversationInfo } from '../../models/models';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public opened = true;
  public conversations: ConversationInfo[] = [];
  public selectedConversationId: string = '';
  private conversationsSubscription: Observable<ConversationInfo[]>;

  constructor(private visual: VisualService, private auth: AuthService, private storage: StorageService, private router: Router, private conversation: ConversationService) { }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/start');
      }
    });
    this.auth.isAuthenticated.next(!!this.storage.getAuthToken());

    // TODO subscribe to this and update conversations on change by polling and calling next on this
    this.conversationsSubscription = this.conversation.getUserConversations();
    this.conversationsSubscription.subscribe((conversationInfos) => {
      this.conversations = conversationInfos;

      if (!this.selectedConversationId && !!conversationInfos.length) {
        this.selectedConversationId = conversationInfos[0].conversationId;
      }
    });

  }

  ngOnDestroy() {
    //this.auth.isAuthenticated.unsubscribe();
  }

  newConversation() {
    const dialogRef = this.visual.displayModal(NewConversationComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((conversationId: string) => {
      console.log("newConversation: ", conversationId);

      // not needed because of subscribing
      // const conversationInfo: ConversationInfo = {
      //   conversationId: conversation.conversationId,
      //   name: conversation.name
      // }

      this.selectedConversationId = conversationId;
    });
  }

}
