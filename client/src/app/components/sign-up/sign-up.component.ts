import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public pictureUrl: string;

  constructor(private auth: AuthService, private router: Router, private dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit() {
  }

  isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  signUp() {
    if (!this.username || !this.password || !this.firstName || !this.lastName || !this.email || !this.isValidEmail(this.email) || !this.pictureUrl) {
      return;
    }

    //this.auth.signUp(this.username, this.password);
    this.auth.signUp(this.username, this.password, {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      pictureUrl: this.pictureUrl
    }).subscribe((signUpResponse) => {
      this.dialogRef.afterClosed().subscribe(() => {
        if (!!signUpResponse) {
          //this.router.navigateByUrl('/home');
        } else {
          // failed to authenticate, let the end user know
        }
      });
      this.dialogRef.close();
    });

  }

}
