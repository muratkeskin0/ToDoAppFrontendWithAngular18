import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoComponent } from "./to-do/to-do.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToDoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularProject1';
  isLoggedIn : boolean = false;
}
