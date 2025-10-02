import { Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgxCalendarComponent } from "igniteui-angular";
import { CalendarTest } from '../models/calendar.model';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, IgxCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})

export class CalendarComponent  {

constructor(private eventService: EventService, ) {}

@ViewChild('calendar', { static: true }) public calendar!: IgxCalendarComponent;

  ev: CalendarTest[] = [];
  eventsOfDay: CalendarTest[] = [];
  selectedDate: Date | null = null;

  onDateSelected(date: Date | Date[]) {
    this.selectedDate = date instanceof Date ? date : date[0];
    this.filterEventsForDate();
  }

  private filterEventsForDate() {
    if (!this.selectedDate) {
      this.eventsOfDay = [];
      return;
    }
 const selected = new Date(this.selectedDate);

  this.eventsOfDay = this.ev.filter(ev => {
    const start = new Date(ev.startDate);
    const end = ev.endDate ? new Date(ev.endDate) : start;
    return selected >= start && selected <= end;
  });
}

  private formatDateToDDMMYYYY(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

ngOnInit(): void {
    const today = this.formatDateToDDMMYYYY(new Date());
    this.eventService.getEventstest(today).subscribe(data => {
      this.ev = data;
    });
  }

}