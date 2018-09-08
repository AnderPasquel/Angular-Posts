//Forma indicada para crear un nuevo componente.
// 1.- Crear es archivo TypeScript y html del nuevo componente
// 2.- Crear el componente con su selector y su referencia al template
// 3.- Crear una clase para exportar los metodos javascrips creados.

import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.services";
import { ActivatedRoute } from "../../../../node_modules/@angular/router";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent implements OnInit{
    enteredValue = '';
    enteredTitle = '';

    constructor(public postsService: PostsService, public route: ActivatedRoute) { }

    ngOnInit(){
        this.route.paramMap.subscribe();
    }

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.postsService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }
}

