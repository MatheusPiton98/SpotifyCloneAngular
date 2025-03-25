import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IArtista } from 'src/app/Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-topArtistas',
  templateUrl: './topArtistas.component.html',
  styleUrls: ['./topArtistas.component.scss'],
})
export class TopArtistasComponent implements OnInit {
  constructor(private router: Router, private spotifyService: SpotifyService) {}

  artistas: IArtista[] = [];
  menuSelecionado: string = 'home';

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas() {
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
    // console.log(this.artistas);
  }

  async buscarTopMusicaArtista(artista: string) {
    const musicas = this.spotifyService.buscarTopMusicaArtista(artista);
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
