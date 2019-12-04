import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ShortcutService } from 'src/app/services/shortcut/shortcut.service';

@Component({
  selector: 'app-new-shortcut',
  templateUrl: './new-shortcut.component.html',
  styleUrls: ['./new-shortcut.component.css']
})
export class NewShortcutComponent implements OnInit {

  public pattern: string;
  public command: string;

  constructor(private dialogRef: MatDialogRef<NewShortcutComponent>, private shortcut: ShortcutService) {

  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  createShortcut() {
    if (!this.pattern || !this.shortcut) {
      return;
    }

    this.shortcut.createShortcut(
      this.pattern,
      this.command
    ).subscribe((shortcut) => {
      this.dialogRef.close(shortcut);
    });
  }

}
