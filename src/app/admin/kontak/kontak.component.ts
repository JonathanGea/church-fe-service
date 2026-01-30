import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-kontak-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kontak.component.html'
})
export class KontakPageComponent {
  officeHours = [
    { day: 'Senin', time: '08:00 - 16:00' },
    { day: 'Selasa', time: '08:00 - 16:00' },
    { day: 'Rabu', time: '08:00 - 16:00' },
    { day: 'Kamis', time: '08:00 - 16:00' },
    { day: 'Jumat', time: '08:00 - 15:00' },
    { day: 'Sabtu', time: '09:00 - 12:00' },
    { day: 'Minggu', time: 'Setelah ibadah' }
  ];

  contacts = [
    { label: 'Telepon kantor', value: '(021) 555-0198' },
    { label: 'WhatsApp admin', value: '+62 812-3456-7890' },
    { label: 'Email kantor', value: 'sekretariat@gereja.local' }
  ];
}
