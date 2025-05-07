import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Noticia {
  titulo: string;
  noticia: string;
  img: string;
}

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto1.component.html',
  styleUrl: './punto1.component.css'
})
export class Punto1Component implements OnInit {
  noticias: Noticia[] = [
    { titulo: 'Lanzamiento de iPhone 15', noticia: 'Apple presentó el nuevo iPhone 15 con mejoras en cámara y rendimiento.', img: 'assets/img/noticias/noticia01.png' },
    { titulo: 'Tesla lanza Cybertruck', noticia: 'Tesla anunció la producción del Cybertruck con nuevas funciones autónomas.', img: 'assets/img/noticias/noticia02.png' },
    { titulo: 'Google mejora Bard', noticia: 'Google actualiza su IA Bard para competir directamente con ChatGPT.', img: 'assets/img/noticias/noticia03.png' },
    { titulo: 'SpaceX logra nuevo récord', noticia: 'SpaceX lanza 60 satélites en una sola misión Starlink.', img: 'assets/img/noticias/noticia04.png' },
    { titulo: 'Meta presenta nuevas Quest', noticia: 'Meta lanza los nuevos visores Quest 3 para experiencias de realidad mixta.', img: 'assets/img/noticias/noticia05.png' },
    { titulo: 'AMD supera a Intel en ventas', noticia: 'AMD toma la delantera en el mercado de CPUs para gaming.', img: 'assets/img/noticias/noticia06.png' },
    { titulo: 'TikTok lanza herramienta de IA', noticia: 'TikTok introduce un generador de videos con inteligencia artificial.', img: 'assets/img/noticias/noticia07.png' },
    { titulo: 'Samsung Galaxy S24 anunciado', noticia: 'Samsung revela el Galaxy S24 con pantalla aún más brillante y potente.', img: 'assets/img/noticias/noticia08.png' },
    { titulo: 'Nueva consola portátil de Sony', noticia: 'Sony sorprende con una consola portátil para competir con Nintendo Switch.', img: 'assets/img/noticias/noticia09.png' },
    { titulo: 'Microsoft Copilot en Windows', noticia: 'Microsoft integra Copilot en Windows 11 para asistencia con IA.', img: 'assets/img/noticias/noticia10.png' }
  ];
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  adelantar(): void {
    this.currentIndex = (this.currentIndex + 1) % this.noticias.length;
  }

  retrasar(): void {
    this.currentIndex = (this.currentIndex - 1 + this.noticias.length) % this.noticias.length;
  }
}