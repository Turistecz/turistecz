import { CalendarEvent } from './../calendar/calendar-event';
import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-calendar-padre',
  standalone: true,
  imports: [CalendarComponent, CommonModule, FormsModule],
  templateUrl: './calendar-padre.component.html',
  styleUrls: ['./calendar-padre.component.css']
})



export class CalendarPadreComponent {

  constructor(private eventService: EventService, ) {}

   items: CalendarEvent[] = [];


  ngOnInit(): void {
    this.eventService.getEventsCalendar().subscribe(data => {
      this.items = data;
      console.log(' Eventos filtrados:', this.items);
    });
  }

}
