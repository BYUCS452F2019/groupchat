import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatBadgeModule,
    MatChipsModule,
  ],
  exports : [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatBadgeModule,
    MatChipsModule,
  ]
})
export class MaterialModule { }