import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css'],
})
export class DialogModalComponent implements OnInit, OnChanges {
  @Input() openDialog: boolean = false;
  @Input() type!: string;
  @Input() message!: string;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnChanges(): void {}

  ngOnInit(): void {}

  /**
   * Closes the dialog modal
   */
  close(): void {
    this.openDialog = false;
    this.closeDialog.emit(false);
  }
}
