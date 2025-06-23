import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  
  @Input() data = {
    id: "",
    title: "",
    link: "",
    description: "",
    category: ""
  };
//
  removeHTMLTags(text: string): string {
    if (text !== undefined){
      return text.replace(/<[^>]*>/g, '').trim();
    }
    else{
      return "";
    }
  };

  ngOnInit() {
    this.data.description = this.removeHTMLTags(this.data.description);
    
  };
}
