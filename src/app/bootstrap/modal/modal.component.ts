import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';

declare let $;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('divModal')
  divModal: ElementRef;

  @Input() size = null;

  constructor() { }

  ngOnInit() { }

  open() {
    const divModal = $(this.divModal.nativeElement);
    divModal.modal({ backdrop: 'static', keyboard: false });
    divModal.modal('show');
  }

  close() {
    const divModal = $(this.divModal.nativeElement);
    divModal.modal('hide');
  }

  openOnCloseAndReloadPage() {
    const divModal = $(this.divModal.nativeElement);
    divModal.modal({ backdrop: 'static', keyboard: false });

    divModal.on('hidden.bs.modal', function (e) {
      window.location.reload();
    });

    divModal.modal('show');
  }

}
