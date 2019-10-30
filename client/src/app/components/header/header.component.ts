import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated: boolean;
  public homeLink = '/start';

  constructor(private auth: AuthService, private storage: StorageService) { }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.homeLink = (isAuthenticated? '/home' : '/start');
    });

    this.auth.isAuthenticated.next(!!this.storage.getAuthToken());
  }

  signOut() {
    this.storage.deleteAuthToken();
    this.auth.isAuthenticated.next(false);
  }

}
