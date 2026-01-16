import { Component, ViewChild, ChangeDetectorRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarTest } from '../models/calendar.model';
import { EventService } from '../services/event.service';
import {IgxCalendarComponent } from "igniteui-angular";

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

  @Input() hideTitle: boolean = false;

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

  coloredDates : Date [] = [];
  fechasUnicas:Date[]=[];

  onDateSelected(date: Date | Date[]) {
    this.selectedDate = date instanceof Date ? date : date[0];
    this.filterEventsForDate(this.selectedDate);
  }

  showEvents(){
    this.eventService.getEventstest().subscribe({
      next:(response) =>{
        console.log("esta es la movida del response", response);
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
      this.expandEventDates();
    }, 
      error:(error)=>{
         console.error('Error al obtener los eventos.', error);
      }

    })
  }

 
 private colorSpecialDates(): void {
  //para asegurarnos de que se carga a tiempo para pintarse
    setTimeout(() => {
      const items = document.querySelectorAll('igx-day-item');
      
      items.forEach(item => {
        const dateAttr = item.getAttribute('ng-reflect-date');
        
        if (dateAttr) {
          const dateFromCalendar = new Date(dateAttr);
          //Para que no haya incompatibilidades posibles por horas
          dateFromCalendar.setHours(0, 0, 0, 0);

          //comparación para pintar los días que coinciden con los días de eventos
          const existeEvento = this.coloredDates.some(f => {
            const fechaEvento = new Date(f);
            fechaEvento.setHours(0, 0, 0, 0);
            return fechaEvento.getTime() === dateFromCalendar.getTime();
          });

          //lo pinta
          if (existeEvento) {
            item.classList.add('dia-evento');
          } else {
            // Importante limpiar para que no se queden pintados días de meses anteriores
            item.classList.remove('dia-evento');
          }
        }
      });
      // Forzamos a Angular a enterarse de los cambios de clase
      this.cdr.detectChanges();
    }, 100); // delay para esperar a que carguen todos los datos
}

  private expandEventDates() {
    let startEvent : Date;
    let endEvent : Date | undefined;
    
    this.coloredDates = [];

    this.mappedEvents.forEach(evento => {
      evento.subEvent?.forEach(sE=>{
        startEvent = new Date (sE.startDate);

  
        let cursor!:Date;

        if(startEvent){
          cursor = new Date(startEvent);
          
          this.coloredDates.push(cursor);
        }
      })      
    })
     this.colorSpecialDates();
    console.log("fechasUn8icas",this.coloredDates)
}

  private filterEventsForDate(date: Date) {
    if (!this.selectedDate) {
      this.eventsOfDay = [];
      return;
    }


    this.eventsOfDay = [];
    console.log("estos son los mapped events");
    console.log(this.mappedEvents);
    this.mappedEvents.forEach(mE=>{
      let subEvent = mE.subEvent;
      subEvent?.forEach(sE=> { 
        this.start = sE.startDate;
        this.transStart = new Date(this.start);
        this.end = sE.endDate?sE.endDate:"";
        this.transEnd = new Date (this.end);
        if(this.transStart.getTime() === this.selectedDate?.getTime()){
          this.eventsOfDay.push(mE)
        } 
      });
    })
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
  }


  onMonthChanged(newDate: Date) {
    const visibleDates = this.getCalendarVisibleDates(newDate);
    this.colorSpecialDates();
    //this.expandEventDates();
    // this.filterEventsForDate();
    this.cdr.detectChanges();
  }

  ngOnInit(){
    const currentDay = new Date();
    this.showEvents();
    this.getCalendarVisibleDates(this.calendar.viewDate);   
    this.onDateSelected(currentDay); 
  }
}