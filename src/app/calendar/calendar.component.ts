import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarTest } from '../models/calendar.model';
import { EventService } from '../services/event.service';
import {IgxCalendarComponent } from "igniteui-angular";
import { expand } from 'rxjs';
import { accessibility } from '@igniteui/material-icons-extended';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, IgxCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})

export class CalendarComponent {

constructor(private eventService: EventService, 
private cdr: ChangeDetectorRef
) {}


@ViewChild('calendar', { static: true }) public calendar!: IgxCalendarComponent;

  ev: CalendarTest[] = [];
  mapped: CalendarTest[] = [];
  eventsOfDay: CalendarTest[] = [];
  selectedDate: Date | null = null;

  flechaIzq: Element | null = null;
  flechaDcha: Element | null = null;

  onDateSelected(date: Date | Date[]) {
    this.selectedDate = date instanceof Date ? date : date[0];
    this.filterEventsForDate();
  }

  showEvents(){
    this.eventService.getEventstest().subscribe({
      next:(response) =>{
        console.log("esta es la movida", response);
        let data = response.result;
        this.mapped = data.map(date => ({
          title:date.title?date.title:undefined,
          subEvent:(date.subEvent?date.subEvent:[]).map(sE => ({
            id:sE.id,
            location: sE.location? {
              title:sE.location.title?sE.location.title:undefined,
              streetAddress:sE.location?.streetAddress??undefined,
              accessibility: sE.location?.accessibility??undefined,
            }:undefined,
            startDate:sE.startDate,
            endDate:sE.endDate? sE.endDate: undefined,
            openingHours: sE.openingHours
            ?{
              dayOfWeek: sE.openingHours.dayOfWeek?sE.openingHours.dayOfWeek:undefined,
              startTime:sE.openingHours.startTime?sE.openingHours.startTime:undefined,
            }
            : undefined
          }))
        }))
        console.log("movida nueva de evento mapeado",this.mapped);
    }, 
      error:(error)=>{
         console.error('Error al obtener los eventos.', error);
      }

    })
  }
/*
  // MÉTODO MEJORADO: Genera una fecha por cada día del evento (incluyendo rangos)
  private buildSpecialDates(): void {
    // const allDates: Date[] = [];

    this.ev.forEach(ev => {
      const start = new Date(ev.startDate);
      const end = ev.endDate ? new Date(ev.endDate) : start;

      // Generar todas las fechas entre start y end (inclusive)
      const currentDate = new Date(start);
      // while (currentDate <= end) {
      //   allDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      // }
    });

    
    // const fechasEventos = this.ev.map(evento => {
    //   return evento.startDate;
    // });

    // console.log(fechasEventos);


    const fechasEventos = this.expandEventDates(this.ev);
    console.log("fechasEventos");
    console.log(fechasEventos);

    const fechasUnicas = fechasEventos.filter((fecha, index) =>{
      return fechasEventos.indexOf(fecha) === index;
    });

    //convertimos fecha a timestamps (en segundos)
    const fechasFiltradasTimestamps = fechasUnicas.map(f => new Date(f).getTime());

    const items = document.querySelectorAll('igx-day-item');

    items.forEach(item => {
        const ts = Number(item.id); // el timestamp del elemento
        if (fechasFiltradasTimestamps.includes(ts)) {
            item.classList.add('dia-evento');
        }
    });

    this.cdr.detectChanges();
  }

  private expandEventDates(events: CalendarTest[]) {
    const result = [];

    for (const ev of events) {
        const start = new Date(ev.startDate);
        let end = null;

        if(ev.endDate != null){
          end = new Date(ev.endDate);
        }

        const cursor = new Date(start);

        // if(end != null){
        //   while (cursor <= end) {
        //       result.push(cursor.toISOString()); // YYYY-MM-DD
        //       cursor.setDate(cursor.getDate() + 1);
        //   }
        // }else{
          result.push(cursor.toISOString()); // YYYY-MM-DD
        // }
    }

    return result;
}

*/
  private filterEventsForDate() {
    if (!this.selectedDate) {
      this.eventsOfDay = [];
      return;
    }

    const selected = new Date(this.selectedDate);
    const selectedMonth = selected.getMonth();
    const selectedYear = selected.getFullYear();

    console.log("eventos");
    console.log(this.ev);

    let start:any;
    let end:any;

    this.eventsOfDay = this.ev.filter(ev => {
      //  ev.subEvent.forEach(sE => {
      //  let start = sE.startDate;
      //  console.log("estoooooo",start)
      // })
      // ev.subEvent.forEach(sE => {
      //   sE.endDate;
      // })
      
    

      //this.formatDateToDDMMYYYY()
      /*
      console.log("selected");
      console.log(selected);

      console.log("start");
      console.log(start.getDate());

      const isSameDay = selected >= start && selected <= end;
      
      const isValidMonth =
        start.getFullYear() > selectedYear ||
        (start.getFullYear() === selectedYear && start.getMonth() >= selectedMonth);

      return selected.getDate() === start.getDate() && selected.getMonth() === start.getMonth();*/
    });
    
  }
/*
  getCalendarVisibleDates(viewDate: Date): Date[] {
    const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);

    let startDay = firstOfMonth.getDay();

    const weekStartsOnMonday = true;
    if (weekStartsOnMonday) {
      startDay = (startDay === 0) ? 6 : startDay - 1;
    }

    const startDate = new Date(firstOfMonth);
    startDate.setDate(firstOfMonth.getDate() - startDay);

    const dates: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      dates.push(d);
    }

    console.log(dates);
    return dates;
  }

  ngAfterViewInit(): void {
    this.flechaIzq = document.querySelector("#igx-calendar-0 > div > section.igx-calendar__pickers.igx-calendar__pickers--days > section > div.igx-calendar-picker__nav > div.igx-calendar-picker__prev > igx-icon");
    this.flechaDcha = document.querySelector("#igx-calendar-0 > div > section.igx-calendar__pickers.igx-calendar__pickers--days > section > div.igx-calendar-picker__nav > div.igx-calendar-picker__next > igx-icon");
    if (this.flechaIzq) {
      this.flechaIzq.addEventListener('click', this.handleArrowClick.bind(this));
    } else {
      console.warn("No se pudo encontrar el elemento de flecha izquierda.");
    }

    if (this.flechaDcha){
      this.flechaDcha.addEventListener('click', this.handleArrowClick.bind(this));
    } else {
      console.warn("No se pudo encontrar el elemento de flecha dcha.");
    }
  }

  handleArrowClick(): void {
    console.log("¡flecha pulsada!");
    this.onMonthChanged(this.calendar.viewDate);
  }

  onMonthChanged(newDate: Date) {
    // const visibleDates = this.getCalendarVisibleDates(newDate);
    const formatted = this.formatDateToDDMMYYYY(newDate);
    console.log("fecha formateada");
    console.log(formatted);
    this.eventService.getEventstest(formatted).subscribe(data => {
      this.ev = data;
      this.buildSpecialDates();
      this.filterEventsForDate();
    });
    this.cdr.detectChanges();
  }
  */
  private formatDateToDDMMYYYY(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
/*
  ngOnInit(): void {
    const today = this.formatDateToDDMMYYYY(new Date());

    this.eventService.getEventstest(today).subscribe(data => {
      this.ev = data;
      this.buildSpecialDates();
      this.filterEventsForDate();
      this.getCalendarVisibleDates(this.calendar.viewDate);
    });
  }*/

  ngOnInit(){
    this.showEvents();
  }
}