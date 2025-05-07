// src/app/punto4/punto4.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoletoService } from '../boletos/boleto.service';
import { Boleto } from '../boletos/boleto.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-punto4',
  templateUrl: './punto4.component.html',
  styleUrls: ['./punto4.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Punto4Component implements OnInit {

  // Propiedades para enlazar con los campos del formulario
  dni: string = '';
  precioBase: number | null = null;
  categoriaTurista: number | null = null; // Usamos null, y los valores serán 1, 2, 3
  email: string = '';

  // Propiedades para mostrar resultados del cálculo de precio individual
  precioFinalCalculado: number | null = null;
  mostrarPrecioTotal: boolean = false;

  // Array para mostrar la lista de boletos (se llenará desde el Servicio)
  boletosVendidos: Boleto[] = [];

  // Array para las opciones de categoría del select
  categorias = [
    { value: 1, viewValue: 'Menor' },
    { value: 2, viewValue: 'Adulto' },
    { value: 3, viewValue: 'Jubilado' }
  ];

  // --- Propiedades para almacenar los resultados del resumen ---
  resumenPorCategoria: { categoria: string, total: number }[] = [];
  totalGeneralVentas: number = 0;
  // ---------------------------------------------------------


  // Inyectamos el BoletoService
  constructor(private boletoService: BoletoService) { }

  ngOnInit(): void {
    // Al inicializar el componente, cargamos la lista de boletos desde el servicio
    this.cargarBoletos();
  }

  // Método que se llama cuando cambia el precio base o la categoría seleccionada
  calcularPrecioFinal(): void {
    // Verificamos que tengamos un precio base y una categoría seleccionada
    if (this.precioBase !== null && this.categoriaTurista !== null) {
      let descuento = 0;
      switch (this.categoriaTurista) {
        case 1: descuento = 0.35; break; // Menor
        case 3: descuento = 0.50; break; // Jubilado
        case 2: // Adulto
        default: descuento = 0; break;
      }

      // Calculamos el precio final
      this.precioFinalCalculado = this.precioBase * (1 - descuento);
      this.mostrarPrecioTotal = true;

    } else {
      this.precioFinalCalculado = null;
      this.mostrarPrecioTotal = false;
    }
  }

  // Método para registrar la venta del boleto
  registrarBoleto(): void {
    // Mantenemos la validación para asegurar datos esenciales
    if (this.dni && this.precioBase !== null && this.categoriaTurista !== null && this.email && this.precioFinalCalculado !== null) {

      const nuevoBoleto: Boleto = {
        dni: this.dni,
        precioBase: this.precioBase,
        categoriaTurista: this.categoriaTurista,
        fechaCompra: new Date(), // La fecha de compra es ahora
        email: this.email,
        precioFinal: this.precioFinalCalculado,
        categoriaNombre: this.boletoService.getNombreCategoria(this.categoriaTurista) // Obtenemos el nombre legible
      };

      // Llamamos al método agregarBoleto del Servicio para guardar
      this.boletoService.agregarBoleto(nuevoBoleto);

      // Después de registrar, actualizamos la lista mostrada Y recalculamos el resumen
      this.cargarBoletos(); // cargarBoletos ahora llamará a calcularResumenVentas

      // Limpiar el formulario después de registrar
       this.limpiarFormulario();

    } else {
      console.warn('Por favor, completa los campos necesarios (DNI, Precio, Categoría, Email) antes de registrar.');
    }
  }

  // Método para cargar la lista de boletos desde el servicio
  cargarBoletos(): void {
    this.boletoService.getBoletos().subscribe(boletos => {
      this.boletosVendidos = boletos; // Asignamos los datos al array local
      console.log('Lista de boletos cargada en el componente:', this.boletosVendidos);

      // *** Después de cargar los boletos, calculamos el resumen ***
      this.calcularResumenVentas();
    });
  }

  // --- Método para calcular el resumen de ventas ---
  calcularResumenVentas(): void {
    // Resetear los totales antes de recalcular
    this.totalGeneralVentas = 0;
    const totalesTemp: { [key: number]: number } = {}; // Objeto temporal para sumar por categoría (usando el ID de categoría)

    // Inicializar totales en 0 para cada categoría si es necesario mostrar incluso si no hay ventas
     this.categorias.forEach(cat => {
         totalesTemp[cat.value] = 0;
     });


    // Iterar sobre los boletos vendidos para sumar
    this.boletosVendidos.forEach(boleto => {
      // Sumar al total general
      this.totalGeneralVentas += boleto.precioFinal;

      // Sumar al total de la categoría correspondiente
      if (boleto.categoriaTurista !== undefined && totalesTemp[boleto.categoriaTurista] !== undefined) {
        totalesTemp[boleto.categoriaTurista] += boleto.precioFinal;
      }
    });

    // Convertir el objeto temporal a un array con nombre de categoría para mostrar en el HTML
    this.resumenPorCategoria = this.categorias.map(cat => {
        return {
            categoria: cat.viewValue, // Usamos el nombre legible
            total: totalesTemp[cat.value] || 0 // Aseguramos que sea 0 si no hubo ventas en esa categoría
        };
    });

    console.log('Resumen por Categoría:', this.resumenPorCategoria);
    console.log('Total General de Ventas:', this.totalGeneralVentas);
  }
  // -----------------------------------------------


  // Método para limpiar el formulario (opcional)
  limpiarFormulario(): void {
    this.dni = '';
    this.precioBase = null;
    this.categoriaTurista = null;
    this.email = '';
    this.precioFinalCalculado = null;
    this.mostrarPrecioTotal = false;
  }

}