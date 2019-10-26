import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisualService } from 'src/app/services/visual/visual.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private visual: VisualService) { }

  ngOnInit() {
  }

  doSignIn() {
    this.visual.displayModal(SignInComponent, {
      width: '300px',
      height: '300px'
    });
  }

}
