import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para pipes y directivas comunes como ngIf, ngFor
// Si usas ng-bootstrap u otra librería para modales, necesitarías importarlas aquí.

@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css'],
  standalone: true, // O remueve si no usas componentes standalone
  imports: [CommonModule] // Añade CommonModule si es standalone
})
export class Punto3Component implements OnInit {

  // --- Configuración del juego ---
  bancoPalabras: string[] = [
    'ANGULAR', 'BOOTSTRAP', 'TYPESCRIPT', 'JAVASCRIPT', 'COMPONENTE',
    'SERVICIO', 'MODULO', 'ROUTING', 'BINDING', 'PIPE'
  ]; // Banco de 10 palabras (categoría: Tecnología)
  categoriaPalabras: string = 'Términos de Desarrollo Web';
  intentosMaximos: number = 6; // Intentos permitidos (ajustable)

  // --- Estado del juego ---
  palabraSecreta: string = ''; // Palabra a adivinar
  palabraOculta: string[] = []; // Estado actual de la palabra mostrada (guiones/letras)
  letrasAdivinadas: string[] = []; // Letras que el usuario ha adivinado correctamente
  intentosRestantes: number = 0; // Intentos que le quedan al usuario
  letrasIncorrectas: string[] = []; // Letras que el usuario ha intentado y no están en la palabra
  estadoJuego: 'jugando' | 'ganado' | 'perdido' = 'jugando'; // Estado actual del juego

  // Imágenes del ahorcado (define las rutas a tus imágenes)
  // Necesitas tener estas imágenes en tu carpeta assets.
  // Por ejemplo, assets/img/ahorcado/ahorcado_0.png, ahorcado_1.png, ... ahorcado_6.png
  imagenesAhorcado: string[] = [
    'assets/img/ahorcado/ahorcado01.png', // Sin partes del cuerpo
    'assets/img/ahorcado/ahorcado02.png', // Cabeza
    'assets/img/ahorcado/ahorcado03.png', // Cuerpo
    'assets/img/ahorcado/ahorcado04.png', // Brazo 1
    'assets/img/ahorcado/ahorcado05.png', // Brazo 2
    'assets/img/ahorcado/ahorcado06.png', // Pierna 1
    'assets/img/ahorcado/ahorcado07.png', // Pierna 2
  ];
  imagenAhorcadoActual: string = this.imagenesAhorcado[0]; // Imagen que se muestra actualmente

  // --- Control del Modal de Perdiste ---
  // Si usas Bootstrap JS directo, esto puede no ser necesario, el modal se maneja con data attributes.
  // Si usas una librería Angular para modales, necesitarás lógica aquí.
   mostrarModalPerdiste: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.iniciarJuego(); // Inicia un nuevo juego al cargar el componente
  }

  // Inicia o reinicia el juego
  iniciarJuego(): void {
    this.estadoJuego = 'jugando';
    this.intentosRestantes = this.intentosMaximos;
    this.letrasAdivinadas = [];
    this.letrasIncorrectas = [];

    // 1. Elegir una palabra secreta al azar del banco
    const indiceAleatorio = Math.floor(Math.random() * this.bancoPalabras.length);
    this.palabraSecreta = this.bancoPalabras[indiceAleatorio].toUpperCase(); // Convertir a mayúsculas para facilitar la comparación

    // 2. Inicializar la palabra oculta con guiones
    this.palabraOculta = Array(this.palabraSecreta.length).fill('_');

    // 3. Inicializar la imagen del ahorcado
    this.imagenAhorcadoActual = this.imagenesAhorcado[0];

    console.log('Juego iniciado. Palabra secreta:', this.palabraSecreta);
  }

  // Procesa la letra ingresada por el usuario
  procesarLetra(letra: string): void {
    // Asegurarse de que solo procesamos una letra y que el juego aún está jugando
    if (this.estadoJuego !== 'jugando' || !letra || letra.length !== 1) {
      return;
    }

    const letraMayuscula = letra.toUpperCase();

    // Verificar si la letra ya fue intentada (correcta o incorrecta)
    if (this.letrasAdivinadas.includes(letraMayuscula) || this.letrasIncorrectas.includes(letraMayuscula)) {
      console.log(`La letra "${letraMayuscula}" ya fue intentada.`);
      return; // Salir si la letra ya fue intentada
    }

    // Verificar si la letra está en la palabra secreta
    if (this.palabraSecreta.includes(letraMayuscula)) {
      // La letra es correcta
      console.log(`¡Letra correcta: ${letraMayuscula}!`);
      this.letrasAdivinadas.push(letraMayuscula); // Añadir a letras adivinadas

      // Actualizar la palabra oculta con la letra correcta
      for (let i = 0; i < this.palabraSecreta.length; i++) {
        if (this.palabraSecreta[i] === letraMayuscula) {
          this.palabraOculta[i] = letraMayuscula;
        }
      }

      // Verificar si el jugador ha ganado
      if (!this.palabraOculta.includes('_')) {
        this.estadoJuego = 'ganado';
        console.log('¡Felicidades! ¡Has ganado!');
      }

    } else {
      // La letra es incorrecta
      console.log(`Letra incorrecta: ${letraMayuscula}`);
      this.letrasIncorrectas.push(letraMayuscula); // Añadir a letras incorrectas
      this.intentosRestantes--; // Restar un intento

      // Actualizar la imagen del ahorcado
      const indiceImagen = this.intentosMaximos - this.intentosRestantes;
      if (indiceImagen < this.imagenesAhorcado.length) {
        this.imagenAhorcadoActual = this.imagenesAhorcado[indiceImagen];
      }

      // Verificar si el jugador ha perdido
      if (this.intentosRestantes <= 0) {
        this.estadoJuego = 'perdido';
        this.mostrarModalPerdiste = true; // Mostrar el modal
        console.log('¡Oh no! Te has quedado sin intentos. ¡Has perdido!');
      }
    }
  }

  // Lógica para cerrar el modal de Perdiste (si lo manejas manualmente)
  cerrarModal(): void {
    this.mostrarModalPerdiste = false;
    // Puedes añadir lógica adicional aquí si es necesario al cerrar el modal,
    // como preparar un nuevo juego o redirigir.
  }

  // Método para obtener la palabra oculta como un string para mostrar
  get palabraOcultaString(): string {
    return this.palabraOculta.join(' '); // Unir los elementos con espacios para mejor legibilidad
  }

  // Método para obtener las letras incorrectas como un string
  get letrasIncorrectasString(): string {
      return this.letrasIncorrectas.join(', ');
  }

   // Método para obtener las letras intentadas (correctas e incorrectas)
   get letrasIntentadas(): string[] {
       return [...this.letrasAdivinadas, ...this.letrasIncorrectas];
   }

}