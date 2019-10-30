import { Component, OnInit, Input } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  constructor(private conversation: ConversationService) { }

  @Input() conversationId: string;

  ngOnInit() {
    // get the conversation by id and display if not null
    this.conversation.getConversationDetails(this.conversationId).subscribe(() => {
      
    });
  }

}
