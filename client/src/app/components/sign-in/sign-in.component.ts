import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private auth: AuthService, private storage: StorageService, private router: Router, private dialogRef: MatDialogRef<SignInComponent>) { }

  ngOnInit() {
  }

  signIn() {
    if(!this.username || !this.password) {
      return;
    }

    this.auth.signIn(this.username, this.password).subscribe((signInResponse) => {
      this.dialogRef.afterClosed().subscribe(() => {
        if (!!signInResponse) {
          //this.router.navigateByUrl('/home');
        } else {
          // failed to authenticate, let the end user know
        }
      });
      this.dialogRef.close();
    });
  }

}
