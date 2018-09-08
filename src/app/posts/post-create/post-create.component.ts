//Forma indicada para crear un nuevo componente.
// 1.- Crear es archivo TypeScript y html del nuevo componente
// 2.- Crear el componente con su selector y su referencia al template
// 3.- Crear una clase para exportar los metodos javascrips creados.

import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from "../posts.services";
import { ActivatedRoute, ParamMap } from "../../../../node_modules/@angular/router";
import { Post } from "../post.models";
import { mimeType } from "./mime-type.validator";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit {
    enteredValue = '';
    enteredTitle = '';
    post: Post;
    isLoading = false;
    form: FormGroup;
    imagePreview: string;
    private mode = 'create';
    private postId: string;

    constructor(
        public postsService: PostsService,
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            content: new FormControl(null, { validators: [Validators.required] }),
            image: new FormControl(null, {
                 validators: [Validators.required],
                 asyncValidators: [mimeType]
             })
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {
                        id: postData._id,
                        title: postData.title,
                        content: postData.content,
                        imagePath: postData.imagePath
                    };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content,
                        image: this.post.imagePath
                    });
                });

            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }

    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postsService.addPost(
                this.form.value.title, 
                this.form.value.content, 
                this.form.value.image
            );
        }
        else {
            this.postsService.updatePost(
                this.postId,
                this.form.value.title,
                this.form.value.content,
                this.form.value.image);
        }
        this.form.reset();
    }
}

