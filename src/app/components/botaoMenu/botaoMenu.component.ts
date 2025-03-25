import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botaoMenu.component.html',
  styleUrls: ['./botaoMenu.component.scss'],
})
export class BotaoMenuComponent implements OnInit {
  constructor() {}

  @Input()
  descricao: string = '';

  @Input()
  selecionado: boolean = false;

  @Output()
  click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }

  ngOnInit() {}
}
