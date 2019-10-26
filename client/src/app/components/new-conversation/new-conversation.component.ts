import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

interface Participant {
  username: string;
}

@Component({
  selector: 'app-new-conversation',
  templateUrl: './new-conversation.component.html',
  styleUrls: ['./new-conversation.component.css']
})
export class NewConversationComponent implements OnInit {

  public name: string;
  public participants: Participant[] = [];
  public isLoading = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private dialogRef: MatDialogRef<NewConversationComponent>) {
    this.participants = [
      { username: 'jeremypleb' }
    ];
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.participants.push({ username: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(participant: Participant): void {
    const index = this.participants.indexOf(participant);

    if (index >= 0) {
      this.participants.splice(index, 1);
    }
  }

  close() {
    this.dialogRef.close();
  }

  createConversation() {
    this.isLoading = true;

    // TODO structure data and create conversation
    const conversation = {};

    // if there was a conversation created, send it back and set it as the conversation
    this.dialogRef.close(conversation);
  }

}
