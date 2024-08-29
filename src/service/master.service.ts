import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToDoItem } from '../Model/ToDoItem';

@Injectable({
  providedIn: 'root'
})



export class MasterService {

  private url: string = "http://localhost:5188/api/ToDoItems";

  constructor(private http: HttpClient) { }

  getAllToDoItems(): Observable<IToDoItem[]> {
    return this.http.get<IToDoItem[]>(this.url);
  }

  getToDoItemById(id:number) :Observable<IToDoItem> {
    const url = `${this.url}/${id}`;
    return this.http.get<IToDoItem>(url);
  }

  createToDoItem(toDoItem:IToDoItem):Observable<IToDoItem>{
    return this.http.post<IToDoItem>(this.url,toDoItem);
  }

  updateToDoItem(toDoItem:IToDoItem):Observable<IToDoItem>{
    const url = `${this.url}/${toDoItem.id}`;
    return this.http.put<IToDoItem>(url,toDoItem);

  }

  deleteToDoItem(id: string): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }



}

