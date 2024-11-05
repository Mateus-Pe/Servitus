import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal" [ngStyle]="estilosModal">
      <div class="modal-background">
      <ng-content select="[modal-background]"></ng-content>
      </div>
      <div class="modal-content" [ngStyle]="estilosModalContent">
        <div class="modal-body">
          <ng-content select="[modal-body]"></ng-content>
        </div>
        <div class="modal-footer">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();

  @Input() estilosModal: { [key: string]: string } = {};
  @Input() estilosModalContent: { [key: string]: string } = {};

  closeModal() {
    this.close.emit();
  }
}
