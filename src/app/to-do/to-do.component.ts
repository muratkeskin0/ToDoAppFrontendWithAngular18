import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IToDoItem } from '../../Model/ToDoItem';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule,NgFor,NgClass,NgIf],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit {
  newTaskName: string = '';
  toDoItems: IToDoItem[] = [];
  filteredToDoItems: IToDoItem[] = [];
  filter: string = 'all'; // Initial filter set to 'all'

  masterService = inject(MasterService);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.masterService.getAllToDoItems().subscribe((items: IToDoItem[]) => {
      this.toDoItems = items;
      this.applyFilter(); 
    });
  }

  createTask(taskName: string): void {
    if (taskName.trim()) {
      const newItem: IToDoItem = { id: '', task: taskName, isCompleted: false };
      this.masterService.createToDoItem(newItem).subscribe((createdItem: IToDoItem) => {
        this.toDoItems.push(createdItem);
        this.applyFilter(); 
        this.newTaskName = ''; 
      });
    }
  }

  toggleTaskCompletion(item: IToDoItem): void {
    item.isCompleted = !item.isCompleted;
    this.updateTask(item); 
  }

  deleteTask(id: string): void {
    this.masterService.deleteToDoItem(id).subscribe(() => {
      this.toDoItems = this.toDoItems.filter(item => item.id !== id);
      this.applyFilter(); 
    });
  }

  updateTask(item: IToDoItem): void {
    this.masterService.updateToDoItem(item).subscribe(() => {
      this.applyFilter(); 
    });
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.applyFilter(); 
  }

  applyFilter(): void {
    if (this.filter === 'completed') {
      this.filteredToDoItems = this.toDoItems.filter(item => item.isCompleted);
    } else if (this.filter === 'notCompleted') {
      this.filteredToDoItems = this.toDoItems.filter(item => !item.isCompleted);
    } else {
      this.filteredToDoItems = this.toDoItems; 
    }
  }
}
