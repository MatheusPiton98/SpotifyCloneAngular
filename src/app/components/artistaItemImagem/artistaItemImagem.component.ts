import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-artistaItemImagem',
  templateUrl: './artistaItemImagem.component.html',
  styleUrls: ['./artistaItemImagem.component.scss'],
})
export class ArtistaItemImagemComponent implements OnInit {
  constructor() {}

  @Input()
  imagemSrc = '';

  @Input()
  artistaNome = '';

  @Output()
  click = new EventEmitter<void>();

  ngOnInit() {}

  onClick() {
    this.click.emit();
  }
}
