import { Component, OnInit } from '@angular/core';
import { VisualService } from 'src/app/services/visual/visual.service';
import { NewConversationComponent } from '../new-conversation/new-conversation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private opened = true;

  constructor(private visual: VisualService) { }

  ngOnInit() {
  }

  newConversation() {
    const dialogRef = this.visual.displayModal(NewConversationComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log("newConversation: ", data);
    });
  }

}
