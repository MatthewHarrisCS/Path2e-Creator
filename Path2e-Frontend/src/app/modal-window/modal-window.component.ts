import { Component } from '@angular/core';

@Component({
  selector: 'modal', 
  inputs: ['header', 'open'],
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {

  public header: string = "";
  public open: boolean = false;

  closeWindow() {
    this.open = false;
  }
}
