import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Importa CommonModule aquí

// Si usas ng-bootstrap u otra librería para modales, necesitarías importarlas aquí.
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Ejemplo si usas ng-bootstrap

@Component({
  selector: 'app-punto2',
  templateUrl: './punto2.component.html',
  styleUrls: ['./punto2.component.css'],
  standalone: true, // <--- Asegúrate de que esté marcado como standalone si es el caso
  imports: [CommonModule] // <--- Añade CommonModule a los imports del componente
})
export class Punto2Component implements OnInit {

  // Array de productos destacados (fuente de datos)
  productos: any[] = [
    { id: 1, nombre: 'Notebook Asus 13L', descripcion: 'Disco 40GB, 15 pulgadas', img: 'assets/img/productos/producto01.png', precio: 45.5 },
    { id: 2, nombre: 'Monitor LG 14', descripcion: 'Texto descriptivo producto 02', img: 'assets/img/productos/producto02.png', precio: 99 },
    { id: 3, nombre: 'Teclado Mecánico', descripcion: 'Teclado RGB Outemu Red', img: 'assets/img/productos/producto03.png', precio: 75.00 },
    { id: 4, nombre: 'Mouse Óptico Inalámbrico', descripcion: 'Ergonómico, 1600 DPI', img: 'assets/img/productos/producto04.png', precio: 25.50 },
    { id: 5, nombre: 'Auriculares Gamer HyperX', descripcion: 'Sonido envolvente 7.1, micrófono extraíble', img: 'assets/img/productos/producto05.png', precio: 85.90 },
    { id: 6, nombre: 'Webcam Logitech C920', descripcion: 'Full HD 1080p, micrófono estéreo', img: 'assets/img/productos/producto06.png', precio: 69.99 }
  ];
  
  // Array que representa el carrito de compras
  carrito: any[] = [];

  // Variable para almacenar el total a pagar
  totalCarrito: number = 0;

  // Propiedad para controlar la visibilidad del modal (si lo manejas manualmente)
  // Si usas una librería como ng-bootstrap, no necesitas esta propiedad.
  mostrarModal: boolean = false;

  // Constructor
  constructor(
    // Si usas ng-bootstrap, inyectarías el servicio aquí:
    // private modalService: NgbModal
  ) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // La lógica de inicialización va aquí si es necesaria.
    // Por ejemplo, cargar datos del carrito si se guardaron localmente.
  }

  // Lógica para agregar un producto al carrito
  agregarAlCarrito(producto: any): void {
    // Agregamos el producto al array del carrito
    this.carrito.push(producto);
    // Recalculamos el total
    this.calcularTotalCarrito();
    console.log(`Producto "${producto.nombre}" agregado al carrito.`);
    console.log('Carrito actual:', this.carrito);
  }

  // Lógica para calcular el total del carrito
  calcularTotalCarrito(): void {
    this.totalCarrito = this.carrito.reduce((sum, item) => sum + item.precio, 0);
  }

  // Lógica para eliminar un producto del carrito por su índice
  eliminarDelCarrito(index: number): void {
    if (index > -1) { // Asegurarse de que el índice sea válido
      const productoEliminado = this.carrito[index];
      this.carrito.splice(index, 1); // Elimina 1 elemento desde el índice
      this.calcularTotalCarrito(); // Recalcula el total
      console.log(`Producto "${productoEliminado.nombre}" eliminado del carrito.`);
      console.log('Carrito actual:', this.carrito);
    }
  }

  // Lógica para mostrar el modal del carrito (si lo manejas manualmente con Bootstrap JS)
  abrirModalCarrito(): void {
    this.mostrarModal = true;
    // ... (código del placeholder para el modal) ...
    console.log('Intentando abrir modal...');
  }

  // Lógica para cerrar el modal del carrito (si lo manejas manualmente con Bootstrap JS)
  cerrarModalCarrito(): void {
    this.mostrarModal = false;
     // ... (código del placeholder para el modal) ...
    console.log('Intentando cerrar modal...');
  }

  // Nota importante: Las funciones abrirModalCarrito y cerrarModalCarrito
  // con la propiedad 'mostrarModal' son solo para ilustrar el control de estado.
  // La forma en que realmente se abre y cierra un modal de Bootstrap desde Angular
  // depende fuertemente de cómo integres Bootstrap JS. La forma más limpia es
  // usar los data attributes de Bootstrap directamente en el botón (como en el HTML de ejemplo)
  // si tienes Bootstrap JS globalmente disponible, o usar una librería Angular
  // como ng-bootstrap que abstrae esa interacción.
}