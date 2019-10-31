import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { StorageService } from '../storage/storage.service';
import { CreateShortcutRequest } from 'src/app/requests/requests';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShortcutService {

  constructor(private server: ServerService, private storage: StorageService) { }

  getUserShortcuts() {
    const username = this.storage.getUser().username;

    return this.server.getUserShortcuts(username).pipe(
      map((getUserShortcutsResponse) => {
        if (!!getUserShortcutsResponse) {
          return getUserShortcutsResponse.shortcuts;
        } else {
          return; // nothing
        }
      })
    )
  }

  createShortcut(pattern, effect) {
    const username = this.storage.getUser().username;

    const createShortcutRequest: CreateShortcutRequest = {
      username,
      pattern,
      effect
    }

    return this.server.createShortcut(createShortcutRequest).pipe(
      map((createShortcutResponse) => {
        if (!!createShortcutResponse) {
          return createShortcutResponse.shortcut;
        } else {
          return; // nothing
        }
      })
    );
  }

  deleteShortcut(shortcutId: string) {
    // TODO not needed for MVP
  }

  applyShortcut() {
    // TODO not needed for MVP since we currently do this serverside
  }

}
