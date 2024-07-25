import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PDFDocument } from 'pdf-lib';

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
  isDownloaded: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.summaryData = navigation.extras.state['summaryData'];
      this.isDelivery = !!this.summaryData.address || !!this.summaryData.email;
    }
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
      // Check if the uploaded file is a PNG or JPEG image
      const fileType = this.uploadedFile.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.isFileUploaded = true;
      } else {
        this.isFileUploaded = false;
        alert('Por favor, sube un archivo de imagen PNG o JPEG.');
      }
    }
  }

  async downloadSummaryAndProof(): Promise<void> {
    // Crear un documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Añadir texto al PDF
    let content = `Resumen de Pedido\n\nNombre: ${this.summaryData.name}\n`;

    if (this.isDelivery) {
      content += `Correo Electrónico: ${this.summaryData.email}\nDirección: ${this.summaryData.address}\n`;
      if (this.summaryData.reference) content += `Referencia: ${this.summaryData.reference}\n`;
      if (this.summaryData.observations) content += `Observaciones: ${this.summaryData.observations}\n`;
    } else {
      content += `Hora de Retiro: ${this.summaryData.pickupTime}\nLocal de Retiro: ${this.summaryData.location}\n`;
    }

    content += `Total a Pagar: $${this.summaryData.total.toFixed(2)}\n`;
    if (this.summaryData.discountedTotal < this.summaryData.total) {
      content += `Total con Descuento: $${this.summaryData.discountedTotal.toFixed(2)}\n`;
    }

    page.drawText(content, { x: 50, y: 350, size: 12 });

    // Añadir imagen del comprobante si existe y es válida
    if (this.uploadedFile && (this.uploadedFile.type === 'image/png' || this.uploadedFile.type === 'image/jpeg')) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const imageBytes = new Uint8Array(fileReader.result as ArrayBuffer);
        let image;
        if (this.uploadedFile!.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          image = await pdfDoc.embedJpg(imageBytes);
        }
        page.drawImage(image, { x: 70, y: 25, width: 130, height: 200 });
        // Guardar el archivo PDF con el resumen y el comprobante
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Resumen_y_Comprobante.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.isDownloaded = true;
      };
      fileReader.readAsArrayBuffer(this.uploadedFile);
    } else {
      // Guardar el archivo PDF con solo el resumen
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Resumen_y_Comprobante.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.isDownloaded = true;
    }
  }

  payWithAhorita(): void {
    if (this.isDownloaded && this.isFileUploaded) {
      this.router.navigate(['/final'], { state: { summaryData: this.summaryData } });
    }
  }

  payInPerson(): void {
    if (this.isDownloaded) {
      this.router.navigate(['/final'], { state: { summaryData: this.summaryData } });
    }
  }
}
