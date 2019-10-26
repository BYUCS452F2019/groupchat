import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private auth: AuthService, private router: Router, private dialogRef: MatDialogRef<SignInComponent>) { }

  ngOnInit() {
  }

  signIn() {
    if(!this.username || !this.password) {
      return;
    }

    //this.auth.signIn(this.username, this.password);
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/home');
    });
    this.dialogRef.close();

  }

}
