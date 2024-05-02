import { Injectable } from "@angular/core";
import { TODOS } from "../model/mock-data";
import { Todo } from "../model/todo.model";

@Injectable({providedIn: 'root'})	

export class TodoService {
    async getTodos() {
        await sleep(1000);
        return TODOS;
    }

    async addTodos(todo:Partial<Todo>) {
        await sleep(1000);

        return {
            id: Math.random().toString(36).substr(2, 9),
            ...todo
        } as Todo;
    }

    async deleteTodo (id:string) {
        await sleep(500);
        return id;
    }

    async updateTodo (id: string, completed:boolean) {
        await sleep(500);

        return {id, completed};
    }
}

async function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}