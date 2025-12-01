import { Component, ViewChild, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarTest } from '../models/calendar.model';
import { EventService } from '../services/event.service';
import { DateRangeDescriptor, DateRangeType, IgxCalendarComponent } from "igniteui-angular";

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, IgxCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})

export class CalendarComponent {

constructor(private eventService: EventService, 
private cdr: ChangeDetectorRef   // <— inyectamos ChangeDetectorRef
) {}


@ViewChild('calendar', { static: true }) public calendar!: IgxCalendarComponent;

  ev: CalendarTest[] = [];
  eventsOfDay: CalendarTest[] = [];
  selectedDate: Date | null = null;

  flechaIzq: Element | null = null;
  flechaDcha: Element | null = null;

  specialDates: DateRangeDescriptor[] = [];

  onDateSelected(date: Date | Date[]) {
    this.selectedDate = date instanceof Date ? date : date[0];
    this.filterEventsForDate();
  }

 private buildSpecialDates(): void {
  this.specialDates = this.ev.map(ev => {
    const d = new Date(ev.startDate);
    return {
      type: DateRangeType.Specific,
      dateRange: [d],
      cssClass: 'event-day'
    };
  });
    this.cdr.detectChanges();
  
}

  private filterEventsForDate() {
    if (!this.selectedDate) {
      this.eventsOfDay = [];
      return;
    }

  const selected = new Date(this.selectedDate);
  const selectedMonth = selected.getMonth();
  const selectedYear = selected.getFullYear();

  this.eventsOfDay = this.ev.filter(ev => {
    const start = new Date(ev.startDate);
    const end = ev.endDate ? new Date(ev.endDate) : start;

    const isSameDay = selected >= start && selected <= end;
    
    const isValidMonth =
      start.getFullYear() > selectedYear ||
      (start.getFullYear() === selectedYear && start.getMonth() >= selectedMonth);

    return isSameDay && isValidMonth;
  });
}

//para conseguir los días que aparecen en el calendario (los propios del mes y los previos y posteriores)
getCalendarVisibleDates(viewDate: Date): Date[] {
  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);

  // Día de la semana del primer día del mes (0 = domingo, 1 = lunes...)
  let startDay = firstOfMonth.getDay();

  // Para que la semana del calendario empiece en lunes
  const weekStartsOnMonday = true;
  if (weekStartsOnMonday) {
    startDay = (startDay === 0) ? 6 : startDay - 1;
  }

  // Fecha inicial mostrada en el calendario
  const startDate = new Date(firstOfMonth);
  startDate.setDate(firstOfMonth.getDate() - startDay);

  // Generar 42 días consecutivos (6 semanas)
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
  const formatted = this.formatDateToDDMMYYYY(newDate);
  this.eventService.getEventstest(formatted).subscribe(data => {
    this.ev = data;
    this.buildSpecialDates();
    this.filterEventsForDate();
  });
   this.cdr.detectChanges();
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
      this.buildSpecialDates();
      this.filterEventsForDate();
      this.getCalendarVisibleDates(this.calendar.viewDate)
    });
  }

}