import { Component, OnInit, Input } from '@angular/core';
import { Post, User } from '../../models/models';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public storage: StorageService) { }

  @Input() post: Post;

  public user: User;

  ngOnInit() {
    this.user = this.storage.getUser();

    console.log(this);
  }

}
