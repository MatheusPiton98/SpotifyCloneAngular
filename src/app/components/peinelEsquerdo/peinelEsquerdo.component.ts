import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/Interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-peinelEsquerdo',
  templateUrl: './peinelEsquerdo.component.html',
  styleUrls: ['./peinelEsquerdo.component.scss'],
})
export class PeinelEsquerdoComponent implements OnInit {
  constructor(private router: Router, private spotifyServise: SpotifyService) {}
  menuSelecionado: string = 'home';

  playlists: IPlaylist[] = [];

  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playlistIcone = faMusic;

  ngOnInit(): void {
    this.buscarPlalist();
  }

  botaoClick(botao: string) {
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/' + botao);
  }

  async buscarPlalist() {
    this.playlists = await this.spotifyServise.buscarPlaylistUsuario();
  }

  irParaPlailyst(playlistId: string) {
    this.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`);
  }
}
