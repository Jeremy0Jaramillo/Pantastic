import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert2',
  templateUrl: './alert2.component.html',
  styleUrls: ['./alert2.component.css']
})
export class Alert2Component {
  @Input() message?: string;
  @Output() confirmed = new EventEmitter<void>();

  confirm(): void {
    this.message = undefined;
    this.confirmed.emit();
  }
}
