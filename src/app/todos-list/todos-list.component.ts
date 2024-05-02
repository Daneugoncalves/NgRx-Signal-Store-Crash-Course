import { Component, effect, inject, viewChild } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  MatButtonToggleChange,
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { TodoFilter, TodosStore } from '../store/todos.store';
import { CommonModule, NgStyle } from '@angular/common';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatSuffix,
    MatInput,
    MatSuffix,
    MatLabel,
    MatButtonToggleModule,
    MatListModule,
    NgStyle,
    CommonModule,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  store = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }

  async onToggleTodo(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();

    await this.store.deleteTodo(id);
  }

  async onAddTodo(value: string) {
    await this.store.addTodo(value);
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodoFilter;

    this.store.updateFilter(filter);
  }
}
