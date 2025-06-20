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

  @Input() data = {
    id: -1,
    title: " ",
    description: " ",
    address: " ",
    horario: " ",
    phone: " ",
    price: " ",
    image: " ",
    uri: " "
  };

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
    this.data.price = this.removeHTMLTags(this.data.price);
  };



}