import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  
  // access data from parent 
  @Input() data = {
    id: "",
    title: "",
    link: "",
    description: "",
    category: ""
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
}
