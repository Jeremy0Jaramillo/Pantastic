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
      product => {
        this.productos = product;
        console.log(this.productos);
      },
      error => {
        console.error('Error al obtener los productos: ', error);
      }
    );
  }

}
