//Forma indicada para crear un nuevo componente.
// 1.- Crear es archivo TypeScript y html del nuevo componente
// 2.- Crear el componente con su selector y su referencia al template
// 3.- Crear una clase para exportar los metodos javascrips creados.

import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../post.models";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
    enteredValue = '';
    enteredTitle = '';

    @Output() postCreated = new EventEmitter<Post>();

    onAddPost(form: NgForm) {
        if (form.invalid){
            return;
        }
        const post: Post = { 
            title: form.value.title, 
            content: form.value.content
        }
        this.postCreated.emit(post);
    }
}

