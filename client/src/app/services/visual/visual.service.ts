import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class VisualService {

  constructor(private dialog: MatDialog, private overlay: Overlay, private snackBar: MatSnackBar) { }

  displayModal<T>(component: ComponentType<T>, config?: MatDialogConfig, ) {
    config = {
      width: '400px',
      height: '200px',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      ...config
    }

    const dialogRef = this.dialog.open(component, config);

    return dialogRef;
  }

  displaySnackBar(message: string, buttonText: string, autoClose = true) {
    const snackBarRef = this.snackBar.open(message, buttonText);

    if (autoClose) {
      setTimeout(() => {
        if (!!snackBarRef) {
          snackBarRef.dismiss();
        }
      }, 6000);
    }

    return snackBarRef;
  }

}
