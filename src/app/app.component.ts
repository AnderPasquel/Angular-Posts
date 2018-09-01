import { Component } from '@angular/core';
import { Post } from "./posts/post.models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = [];

  onPostAdded(post){
    this.storedPosts.push(post);
  }
}
