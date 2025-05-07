// src/app/boletos/boleto.model.ts

// Interfaz que define la estructura de un objeto Boleto
export interface Boleto {
    dni: string;
    precioBase: number; // El precio ingresado antes del descuento
    categoriaTurista: number; // 1: Menor, 2: Adulto, 3: Jubilado
    fechaCompra: Date;
    email: string;
    precioFinal: number; // El precio con el descuento aplicado
    categoriaNombre?: string; // Nombre legible de la categoría (opcional, para mostrar)
  }