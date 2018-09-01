import { Component, Input } from "@angular/core";
import { Post } from "../post.models";

@Component({
    selector:'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
    /*posts = [
        {title: 'Frist post', content:'This is the fristpost'},
        {title: 'Second post', content: 'This is the fristpost'},
        {title: 'Third post', content: 'This is the fristpost'}
    ];*/
    @Input() posts: Post[] = [];
}