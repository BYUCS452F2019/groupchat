import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  @Input() post: Post;

  ngOnInit() {
  }

}
