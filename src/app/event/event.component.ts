import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  
  @Input() data = {
    id: "",
    title: "",
    link: "",
    description: "",
    category: ""
  };
}
