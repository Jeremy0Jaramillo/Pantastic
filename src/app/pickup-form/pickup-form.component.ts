import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickup-form',
  templateUrl: './pickup-form.component.html',
  styleUrls: ['./pickup-form.component.css']
})
export class PickupFormComponent {
  name: string = '';
  pickupTime: string = '';
  selectedLocation: string = '';
  total: number = 0;
  locations: string[] = ['Morelia', 'Sweet and Fit', 'Yawi'];

  constructor(private firestore: AngularFirestore, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.total = navigation.extras.state['total'];
    }
  }

  submitForm(): void {
    const pickupData = {
      name: this.name,
      pickupTime: this.pickupTime,
      location: this.selectedLocation,
      total: this.total
    };

    this.firestore.collection('pickups').add(pickupData).then(() => {
      this.router.navigate(['/pago'], { state: { summaryData: pickupData } });
    });
  }
}
