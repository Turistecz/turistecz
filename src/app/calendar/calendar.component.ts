import { Component, Input } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent  {
  
   @Input() items: CalendarEvent ={
  
    title: "",
    description: "", 
    category: "",
    location: "",
    link: "",
    icon: ""
}
  


  // calendarOptions: any = {
  //   initialView: 'dayGridMonth',
  //   plugins: [dayGridPlugin, interactionPlugin],
  //   selectable: true,
  //   editable: true,
  //   dateClick: (info: any) => {
  //     this.dateSelected.emit(info.dateStr);
  //   }
  // };


  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['events'] && this.fullCalendar) {
  //     this.refreshEvents();
  //   }
  // }

  // refreshEvents() {
  //   const calendarApi = this.fullCalendar.getApi();
  //   calendarApi.removeAllEvents();
  //   calendarApi.addEventSource(
  //     this.events.map(ev => ({
  //       title: ev.title,
  //       date: ev.date,
  //       backgroundColor: ev.color || '#1976d2'
  //     }))
  //   );
  // }
}
