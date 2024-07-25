import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { LoginService } from '../services/login.service';  // Suponiendo que tengas un AuthService para obtener el ID del usuario
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  userPayments: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private authService: LoginService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().pipe(
      switchMap(userId => {
        console.log(userId);
        if (userId) {
          return this.paymentService.getUserPayments(userId);
        } else {
          return of([]); // Devuelve un array vacío si no hay usuario autenticado
        }
      })
    ).subscribe(payments => {
      this.userPayments = payments;
      console.log(this.userPayments);
    });
  }

  downloadProof(proofUrl: string): void {
    window.open(proofUrl, '_blank');
  }
}
