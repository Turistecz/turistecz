
import { CalendarTest } from '../models/calendar-event.models';
import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-calendar-padre',
  imports: [CalendarComponent, CommonModule, FormsModule],
  templateUrl: './calendar-padre.component.html',
  styleUrls: ['./calendar-padre.component.css']
})

export class CalendarPadreComponent {

  constructor(private eventService: EventService, ) {}

   items: CalendarTest[] = [];

  private formatDateToDDMMYYYY(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
   
ngOnInit(): void {
    const today = this.formatDateToDDMMYYYY(new Date());
    this.eventService.getEventstest(today).subscribe(data => {
      this.items = data;
    });
  }

}
