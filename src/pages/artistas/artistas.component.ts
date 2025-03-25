import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArtista } from 'src/app/Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss'],
})
export class ArtistasComponent implements OnInit {
  constructor(private router: Router, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  bannerImagemUrl: string = '';
  bannerTexto: string = '';
  titulo: string = '';

  artistas: IArtista[] = [];
  menuSelecionado: string = 'Home';

  async buscarTopArtistas() {
    const artista = await this.spotifyService.buscarTopArtistas();
    this.artistas = artista;
  }

  botaoClick(botao: string) {
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/home');
  }

  irParaMusicasArtista(artistaId: string) {
    this.menuSelecionado = artistaId;
    this.router.navigateByUrl(`player/lista/artista/${artistaId}`);
  }
}
