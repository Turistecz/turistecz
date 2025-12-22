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
  mappedEvents: CalendarTest[] = [];
  eventsOfDay: CalendarTest[] = [];
  selectedDate: Date | null = null;

  flechaIzq: Element | null = null;
  flechaDcha: Element | null = null;

  start: string = "";
  end: string = "";
  transStart: Date | null = null;
  transEnd: Date | null = null;

  onDateSelected(date: Date | Date[]) {
    this.selectedDate = date instanceof Date ? date : date[0];
    this.filterEventsForDate();
  }

  showEvents(){
    this.eventService.getEventstest().subscribe({
      next:(response) =>{
        console.log("esta es la movida", response);
        let data = response.result;
        this.mappedEvents = data.map(date => ({
          title:date.title?date.title:undefined,
          id: date.id,
          subEvent:(date.subEvent?date.subEvent:[]).map(sE => ({
            location: sE.location? {
              title:sE.location.title?sE.location.title:undefined,
              streetAddress:sE.location?.streetAddress??undefined,
              accessibility: sE.location?.accessibility??undefined,
            }:undefined,
            startDate:sE.startDate,
            endDate:sE.endDate? sE.endDate: undefined,
            openingHours:(sE.openingHours?sE.openingHours:[]).map(oH => ({
              dayOfWeek: oH.dayOfWeek?oH.dayOfWeek:undefined,
              startTime: oH.startTime?oH.startTime:undefined
            })) 
          }))
        }))
        
    }, 
      error:(error)=>{
         console.error('Error al obtener los eventos.', error);
      }

    })
  }

  // MÉTODO MEJORADO: Genera una fecha por cada día del evento (incluyendo rangos)
  private buildSpecialDates(): void {
    const allDates: Date[] = [];

    // this.ev.forEach(ev => {
    //   const start = new Date(ev.startDate);
    //   const end = ev.endDate ? new Date(ev.endDate) : start;

    //   //Generar todas las fechas entre start y end (inclusive)
    //   const currentDate = new Date(start);
    //   while (currentDate <= end) {
    //     allDates.push(new Date(currentDate));
    //     currentDate.setDate(currentDate.getDate() + 1);
    //   }
    // });

    // const fechasEventos = this.ev.map(evento => {
    //   return evento.startDate;
    // });

/*
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

    // for (const ev of events) {
  
        const cursor = this.transStart?this.transStart:"No hay día inicial";

        if(this.end != null){
          while (cursor <= this.end) {
              result.push(cursor); // YYYY-MM-DD
              //cursor.setDate(cursor.getDate() + 1);
          }
        }else{
          result.push(cursor); // YYYY-MM-DD
        }
    }

    // return result;
// 
*/
}


  private filterEventsForDate() {
    if (!this.selectedDate) {
      this.eventsOfDay = [];
      return;
    }

    //console.log(this.mappedEvents);

    this.eventsOfDay = [];
    this.mappedEvents.forEach(mE=>{
      let subEvent = mE.subEvent;
      console.log("mapped sub");
      console.log(subEvent)
      subEvent?.forEach(sE=> { 
        this.start = sE.startDate;
        this.transStart = new Date(this.start);
        this.end = sE.endDate?sE.endDate:"";
        this.transEnd = new Date (this.end);
        if(this.transStart.getTime() === this.selectedDate?.getTime()){
          //console.log("coinciden",subEvent)
          this.eventsOfDay.push(mE)
        } else {
          //console.log("no")
          
        }
      });
      console.log("traaaans", this.transStart)
      console.log("eventos epicos del dia", this.eventsOfDay)
    })

      //const isSameDay = selected >= this.transStart && selected <= this.transEnd;
      
    //   if(this.transStart!==null && this.transEnd!==null){
    //     const isSameDay = selected >= this.transStart && selected <= this.transEnd;
    //   }else if(this.transEnd===null){
    //     const isSameDay =
    //   }
      
    //   const isValidMonth =
    //     this.start.getFullYear() > selectedYear ||
    //     (start.getFullYear() === selectedYear && start.getMonth() >= selectedMonth);

    //   return selected.getDate() === start.getDate() && selected.getMonth() === start.getMonth();*/
    // }:undefined);
    
  }
  

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

    console.log("dates",dates);
    return dates;
  }



  ngAfterViewInit(): void {
      // Buscar el elemento en el DOM. Es seguro aquí.
      this.flechaIzq = document.querySelector("#igx-calendar-0 > div > section.igx-calendar__pickers.igx-calendar__pickers--days > section > div.igx-calendar-picker__nav > div.igx-calendar-picker__prev > igx-icon");
      this.flechaDcha = document.querySelector("#igx-calendar-0 > div > section.igx-calendar__pickers.igx-calendar__pickers--days > section > div.igx-calendar-picker__nav > div.igx-calendar-picker__next > igx-icon");

      // Verificar que se encontró el elemento
      if (this.flechaIzq) {
          // Adjuntar el listener. Usamos .bind(this) para mantener el contexto de la clase.
          this.flechaIzq.addEventListener('click', this.handleArrowClick.bind(this));
          console.log("Listener de click adjunto a flechaIzq.");
      } else {
          console.warn("No se pudo encontrar el elemento de flecha izquierda.");
      }

      if (this.flechaDcha){
        this.flechaDcha.addEventListener('click', this.handleArrowClick.bind(this));
      }
  }

  handleArrowClick(): void {
      console.log("¡flecha pulsada!");
      this.onMonthChanged(this.calendar.viewDate);
      // NOTA: El calendario de IgniteUI ya debería haber cambiado la vista,
      // pero si necesitas ejecutar tu lógica de carga de eventos, puedes llamar a:
      // this.onMonthChanged(this.calendar.viewDate);
  }


  onMonthChanged(newDate: Date) {
    const visibleDates = this.getCalendarVisibleDates(newDate);
    //const formatted = this.formatDateToDDMMYYYY(newDate);
    // this.eventService.getEventstest(formatted).subscribe(data => {
    //   this.ev = data;
    //   this.buildSpecialDates();
    //   this.filterEventsForDate();
    // });
    this.buildSpecialDates();
    this.filterEventsForDate();
    this.cdr.detectChanges();
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
    this.getCalendarVisibleDates(this.calendar.viewDate);
  }
}