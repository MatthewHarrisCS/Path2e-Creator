import { Component, ContentChild } from '@angular/core';

@Component({
  selector: 'modal', 
  inputs: ['header', 'confirm'],
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {
  
  public header: string = "";
  public confirm: boolean = false;

}
