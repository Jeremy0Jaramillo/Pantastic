import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  summaryData: any = {};
  isFileUploaded: boolean = false;
  uploadedFile: File | null = null;
  isDelivery: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.summaryData = navigation.extras.state['summaryData'];
      // Determina si es Delivery basado en la presencia de ciertos datos
      this.isDelivery = !!this.summaryData.address || !!this.summaryData.email;
    }
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
      this.isFileUploaded = true;
    }
  }

  payWithAhorita(): void {
    if (this.uploadedFile) {
      // Lógica para manejar el archivo subido
      this.router.navigate(['/final'], { state: { summaryData: this.summaryData } });
    }
  }

  payInPerson(): void {
    this.router.navigate(['/final'], { state: { summaryData: this.summaryData } });
  }
}
