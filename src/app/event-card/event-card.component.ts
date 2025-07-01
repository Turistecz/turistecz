import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-event-card',
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {


  // access data from parent 
  @Input() data = {
    title: "",
    description: ""
    
  };

  @Input() bg: boolean = false;
  

  // remove html tags <> from text
  removeHTMLTags(text: string): string {
    if (text !== undefined){
      return text.replace(/<[^>]*>/g, '').trim();
    }
    else{
      return "";
    }
  };

  // call the function on start
  ngOnInit() {
    this.data.description = this.removeHTMLTags(this.data.description);
    
  };

  getOtherColor(){
     return {
          'bg-color1': this.bg,
          'bg-color2': !this.bg

    }
  }
}



