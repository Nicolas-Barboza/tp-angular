import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importa FontAwesomeModule
import { faHome, faNewspaper, faBox, faGamepad, faTicket } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule], // Agrega FontAwesomeModule a los imports
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  faHome = faHome; // Asigna los íconos a las propiedades
  faNewspaper = faNewspaper;
  faBox = faBox;
  faGamepad = faGamepad;
  faTicket = faTicket ;

  constructor() { }

  ngOnInit(): void {
  }
}