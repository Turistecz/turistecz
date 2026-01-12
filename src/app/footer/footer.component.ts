import { Component } from '@angular/core';
import { PrivatePolicyComponent } from '../private-policy/private-policy.component';

@Component({
  selector: 'app-footer',
  imports: [PrivatePolicyComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
