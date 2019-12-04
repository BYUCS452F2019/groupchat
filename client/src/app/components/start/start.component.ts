import { Component, OnInit, OnDestroy } from '@angular/core';
import { VisualService } from 'src/app/services/visual/visual.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {

  constructor(private visual: VisualService, private auth: AuthService, private storage: StorageService, private router: Router) { }

  ngOnInit() {
    this.auth.isAuthenticated.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/home');
      }
    });
    this.auth.isAuthenticated.next(!!this.storage.getAuthToken());
  }

  ngOnDestroy() {
    //this.auth.isAuthenticated.unsubscribe();
  }

  doSignIn() {
    this.visual.displayModal(SignInComponent, {
      width: '300px',
      height: '300px'
    });
  }

  doSignUp() {
    this.visual.displayModal(SignUpComponent, {
      width: '300px',
      height: '500px'
    });
  }

}
