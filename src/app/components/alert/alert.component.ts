import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message?: string;
  @Output() close = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  closeAlert(): void {
    this.message = undefined;
    this.close.emit();
  }

  confirm(): void {
    this.message = undefined;
    this.confirmed.emit();
  }
}
