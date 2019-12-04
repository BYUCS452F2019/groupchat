import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StartComponent } from './components/start/start.component';
import { HomeComponent } from './components/home/home.component';
import { ShortcutComponent } from './components/shortcut/shortcut.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'shortcut', component: ShortcutComponent },
  { path: 'start', component: StartComponent },
  { path: '', 
    redirectTo: '/start',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
