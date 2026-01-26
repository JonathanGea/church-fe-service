import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dev-links',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dev-links.component.html',
  styleUrl: './dev-links.component.css'
})
export class DevLinksComponent {}
