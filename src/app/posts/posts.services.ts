import { Post } from "./post.models";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { post } from "selenium-webdriver/http";


@Injectable({ providedIn: 'root' })

export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id

                    }
                });
            })))
            .subscribe((transforedPosts) => {
                this.posts = transforedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        this.http.post<{ message: string, postid: string }>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                console.log(responseData.message);
                const id = responseData.postid;
                post.id = id;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
       
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                const updateedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = updateedPosts;
                this.postsUpdated.next([...this.posts]);

            })
    }
}