import { Component, OnInit } from '@angular/core';
import { Shortcut } from 'src/app/models/models';
import { ShortcutService } from 'src/app/services/shortcut/shortcut.service';

import { VisualService } from 'src/app/services/visual/visual.service';
import { NewShortcutComponent } from '../new-shortcut/new-shortcut.component';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {

  public shortcuts: Shortcut[] = [];

  constructor(private shortcut: ShortcutService, private visual: VisualService) { }

  ngOnInit() {
    this.shortcut.getUserShortcuts().subscribe((shortcuts) => {
      if (!!shortcuts) {
        this.shortcuts = shortcuts;
      }
    });
  }

  createShortcut() {
    this.visual.displayModal(NewShortcutComponent, {
      width: '300px',
      height: '300px'
    }).afterClosed().subscribe((shortcut: Shortcut) => {
      if (!!shortcut) {
        this.shortcuts.push(shortcut);
      }
    })
  }

  trackByShortcutIdFn(index, shortcut: Shortcut) {
    return shortcut.shortcutId;
  }

}
