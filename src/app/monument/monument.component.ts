import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monument',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monument.component.html',
  styleUrl: './monument.component.css'
})
export class MonumentComponent implements OnInit {

  // access data from parent 
  @Input() data = {
    id: -1,
    title: "",
    description: "",
    address: "",
    horario: "",
    phone: "",
    price: "",
    image: "",
    uri: ""
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
    this.data.price = this.removeHTMLTags(this.data.price);
    this.data.horario = this.removeHTMLTags(this.data.horario);

  };


 

}