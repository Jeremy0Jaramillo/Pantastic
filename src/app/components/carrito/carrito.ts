import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Product from "../../interfaces/product.interface";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {
  productosSeleccionados: { product: Product, cantidad: number }[] = [];
  total: number = 0;
  mostrarDialogo: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const productos: Product[] = navigation.extras.state['productos'] || [];
      const cantidades: { [id: string]: number } = navigation.extras.state['cantidades'] || {};

      this.productosSeleccionados = productos
        .map(product => ({
          product,
          cantidad: cantidades[product.id]
        }))
        .filter(item => item.cantidad > 0);
    }
  }

  ngOnInit(): void {
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.productosSeleccionados.reduce((sum, item) => {
      return sum + (item.product.price * item.cantidad);
    }, 0);
  }

  escogerFormaRetiro(): void {
    this.mostrarDialogo = true;
  }

  seleccionarOpcion(opcion: string): void {
    this.mostrarDialogo = false;
    if (opcion === 'pickup') {
      this.router.navigate(['/pickup'], { state: { total: this.total } });
    } else if (opcion === 'delivery') {
      this.router.navigate(['/delivery'], { state: { total: this.total } });
    }
  }

  cerrarDialogo(): void {
    this.mostrarDialogo = false;
  }
}
