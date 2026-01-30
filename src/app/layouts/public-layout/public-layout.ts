import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicFooterComponent } from '../../shared/ui/public-footer/public-footer.component';
import { PublicHeaderComponent } from '../../shared/ui/public-header/public-header.component';
import { DevLinksComponent } from '../../shared/ui/dev-links/dev-links.component';

@Component({
  selector: 'app-public-layout',
  imports: [PublicFooterComponent, PublicHeaderComponent, RouterOutlet, DevLinksComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css'
})
export class PublicLayoutComponent {}
