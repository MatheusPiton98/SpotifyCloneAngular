import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-buscasRecentes',
  templateUrl: './buscasRecentes.component.html',
  styleUrls: ['./buscasRecentes.component.scss'],
})
export class BuscasRecentesComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  pesquisasRecentes = [
    'The Weeknd',
    'Kendrick Lamar',
    'Pink Floyd',
    'JID',
    'Frank Ocean',
  ];

  menuSelecionado: string = 'Home';
  campoPesquisa: string = '';

  ngOnInit(): void {
    this.buscaTopItens();
  }

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
  }

  async buscaTopItens() {
    const teste = await this.spotifyService.buscaTopItens();
    this.pesquisasRecentes = teste.map((x) => x.titulo);
  }

  async buscar() {
    this.spotifyService.buscaPesquisa(this.campoPesquisa);
    this.irParaMusicasPesquisada(this.campoPesquisa);
  }

  irParaMusicasPesquisada(musicaId: string) {
    this.menuSelecionado = musicaId;
    this.router.navigateByUrl(`player/lista/search/${musicaId}`);
  }
}
