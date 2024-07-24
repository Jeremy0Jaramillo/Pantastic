import { Component, OnInit } from '@angular/core';
import { ConsultasService } from "../../services/consultas.service";
import Product from "../../interfaces/product.interface";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})

export class CartComponent implements OnInit {
  productos: Product[] = [];
  productosFiltrados: Product[] = [];
  cantidades: { [id: string]: number } = {};

  constructor(
    private consultasService: ConsultasService,
    private router: Router,
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.consultasService.obtenerProductos().subscribe(
      products => {
        this.productos = products;
        this.productosFiltrados = products;
        products.forEach(product => {
          this.cantidades[product.id] = 0; // Inicializa la cantidad de cada producto en 0
        });
      },
      error => {
        console.error('Error al obtener los productos: ', error);
      }
    );
  }

  incrementarCantidad(productId: string): void {
    this.cantidades[productId]++;
  }

  decrementarCantidad(productId: string): void {
    if (this.cantidades[productId] > 0) {
      this.cantidades[productId]--;
    }
  }

  irAlCarrito(): void {
    this.router.navigate(['/carrito'], { state: { productos: this.productos, cantidades: this.cantidades } });
  }

  buscarProductos(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.productosFiltrados = this.productos.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
  }

}
