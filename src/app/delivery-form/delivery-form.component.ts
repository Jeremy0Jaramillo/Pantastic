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
  total: number = 0;

  constructor(private firestore: AngularFirestore, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.total = navigation.extras.state['total'];
    }
  }

  submitForm(): void {
    const deliveryData = {
      name: this.name,
      email: this.email,
      address: this.address,
      reference: this.reference,
      observations: this.observations,
      total: this.total
    };

    this.firestore.collection('delivery').add(deliveryData).then(() => {
      this.router.navigate(['/pago'], { state: { summaryData: deliveryData } });
    });
  }


}
