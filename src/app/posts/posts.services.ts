import { Post } from "./post.models";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { post } from "selenium-webdriver/http";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })

export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{posts:Post[],postCount: number}>();

    constructor(private http: HttpClient, private router: Router) { }

    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        this.http
            .get<{ message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
            .pipe(map((postData => {
                return { posts: postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath

                    };
                }), maxPosts: postData.maxPosts};
            })))
            .subscribe((transforedPostData) => {
                this.posts = transforedPostData.posts;
                this.postsUpdated.next({posts:[...this.posts], postCount: transforedPostData.maxPosts});
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(
            'http://localhost:3000/api/posts/' + id);
    }

    addPost(title: string, content: string, image: File) {
        //const post: Post = { id: null, title: title, content: content };
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
        this.http.post<{ message: string, post: Post }>(
            'http://localhost:3000/api/posts/',
            postData)
            .subscribe((responseData) => {
                /*const post: Post = {
                    id: responseData.post.id,
                    title: title,
                    content: content,
                    imagePath: responseData.post.imagePath
                };
                console.log(responseData.message);
                const id = responseData.post.id;
                post.id = id;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);*/
                this.router.navigate(['/']);
            });

    }

    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: Post | FormData;
        if (typeof image === "object") {
            postData = new FormData();
            postData.append("id", id);
            postData.append("title", title);
            postData.append("content", content);
            postData.append("image", image, title);
        } else {
            postData = {
                id: id,
                title: title,
                content: content,
                imagePath: image
            };
        }
        this.http
            .put('http://localhost:3000/api/posts/' + id, postData)
            .subscribe(response => {
                /*const updateedPosts = [...this.posts];
                const oldPostIndex = updateedPosts.findIndex(p => p.id === id);
                const post: Post = {
                    id: id,
                    title: title,
                    content: content,
                    imagePath: ""
                };
                updateedPosts[oldPostIndex] = post;
                this.posts = updateedPosts;
                this.postsUpdated.next([...this.posts]);*/
                this.router.navigate(['/']);
            });

    }

    deletePost(postId: string) {
        return this.http.delete('http://localhost:3000/api/posts/' + postId);
           /* .subscribe(() => {
                const updateedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = updateedPosts;
                this.postsUpdated.next([...this.posts]);

            });*/
    }
}