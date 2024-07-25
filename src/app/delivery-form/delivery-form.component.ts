import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent {
  name: string = '';
  email: string = '';
  address: string = '';
  reference: string = '';
  observations: string = '';
  coupon: string = '';
  total: number = 0;
  discountedTotal: number = 0;

  constructor(private firestore: AngularFirestore, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.total = navigation.extras.state['total'];
      this.discountedTotal = this.total; // Inicialmente, el total con descuento es el mismo que el total
    }
  }

  applyCoupon(): void {
    if (this.coupon === 'Pant3xgy') {
      this.discountedTotal = parseFloat((this.total * 0.8).toFixed(2));
    } else {
      this.discountedTotal = this.total;
    }
  }

  submitForm(): void {
    this.applyCoupon(); // Asegura que el descuento se aplique antes de enviar el formulario

    const deliveryData = {
      name: this.name,
      email: this.email,
      address: this.address,
      reference: this.reference,
      observations: this.observations,
      coupon: this.coupon,
      total: this.total,
      discountedTotal: this.discountedTotal
    };

    this.firestore.collection('delivery').add(deliveryData).then(() => {
      this.router.navigate(['/pago'], { state: { summaryData: deliveryData } });
    });
  }
}
