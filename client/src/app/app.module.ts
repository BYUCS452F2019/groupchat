import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HeaderComponent } from './components/header/header.component';
import { StartComponent } from './components/start/start.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { NewConversationComponent } from './components/new-conversation/new-conversation.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
  entryComponents: [
    SignInComponent,
    SignUpComponent,
    NewConversationComponent,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    SignUpComponent,
    SignInComponent,
    StartComponent,
    PageNotFoundComponent,
    NewConversationComponent,
    ConversationComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
