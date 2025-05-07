// src/app/boletos/boleto.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Necesario para Observable
import { Boleto } from './boleto.model'; // <-- Importamos la interfaz desde el mismo directorio

@Injectable({
  providedIn: 'root' // El servicio se registra a nivel de aplicación
})
export class BoletoService {

  // Array privado para almacenar los boletos vendidos
  private boletosVendidos: Boleto[] = [];

  constructor() {
    // Lógica de inicialización si es necesaria (ej. cargar de localStorage)
  }

  // Método para agregar un nuevo boleto al array
  // Recibe un objeto del tipo Boleto
  agregarBoleto(boleto: Boleto): void {
    // Agregamos el boleto al array interno del servicio
    this.boletosVendidos.push(boleto);
    console.log('Boleto registrado en el servicio:', boleto);
    // Opcional: Lógica para guardar en localStorage u otra persistencia
  }

  // Método para obtener todos los boletos vendidos
  // Devuelve un Observable de un array de Boletos
  getBoletos(): Observable<Boleto[]> {
    // Devolvemos una copia del array como Observable para evitar modificaciones directas y simular asincronía
    return of([...this.boletosVendidos]);
  }

   // Método para obtener el nombre legible de la categoría (útil para mostrar)
   getNombreCategoria(categoria: number): string {
       switch (categoria) {
           case 1: return 'Menor';
           case 2: return 'Adulto';
           case 3: return 'Jubilado';
           default: return 'Desconocida';
       }
   }

  // Opcional: Métodos para otras operaciones CRUD (eliminar, actualizar, obtener por ID)
  // eliminarBoleto(id: string): void { ... }
  // actualizarBoleto(boleto: Boleto): void { ... }
  // getBoletoPorId(id: string): Observable<Boleto | undefined> { ... }
}