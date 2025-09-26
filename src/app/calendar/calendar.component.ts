import { Component, EventEmitter, Input, Output, ViewChild, OnChanges, SimpleChanges, input, OnInit } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { CommonModule } from '@angular/common';
import { IgxButtonDirective, IgxCalendarComponent, IgxDialogComponent, DateRangeType } from "igniteui-angular";

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, IgxCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent  {

@ViewChild('calendar', { static: true }) public calendar!: IgxCalendarComponent;

  @Input() ev: CalendarEvent[] = [];    
  eventsOfDay: CalendarEvent[] = [];
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

    const selected = this.selectedDate;

    this.eventsOfDay = this.ev.filter(ev => {
      const start = new Date(ev.startDate);
      const end = ev.endDate ? new Date(ev.endDate) : start;
      return selected >= start && selected <= end;
    });
  }
}

