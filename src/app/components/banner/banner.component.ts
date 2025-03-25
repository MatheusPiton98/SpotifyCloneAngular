import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor(private router: Router) {}

  menuSelecionado: string = 'Home';

  @Input()
  imagemUrl = '';

  @Input()
  text = '';

  @Output()
  click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }

  ngOnInit() {}
}
