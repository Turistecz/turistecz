import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  // access data from parent 
  @Input() data = {
    title: "",
    description: ""
    
  };

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



  getDifferentColor(){
    const colors = ['#f0f8ff','#2a8dfb'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}


