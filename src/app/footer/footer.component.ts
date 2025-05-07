import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css' // Cambiado a .css
})
export class FooterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
