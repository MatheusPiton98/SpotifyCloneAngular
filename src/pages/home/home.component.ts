import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factorys';
import { IMusica } from 'src/app/Interfaces/IMusicas';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  musicaAtual: IMusica = newMusica();

  subs: Subscription[] = [];

  playIcone = faPlay;
  pauseIcon = faPause;
  musicas: IMusica[] = [];
  count = this.musicas;

  verificaPausado: boolean = this.musicaAtual != newMusica() ? false : true;

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();
    // console.log(this.musicas);
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map((a) => a.nome).join(', ');
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  async clickMusica(musica: IMusica) {
    await this.executarMusica(musica);
    if (this.verificaPausado) this.pausarMusica();
    else this.startMusica();
  }

  pausarMusica() {
    this.playerService.pausarMusica();
    this.verificaPausado = !this.verificaPausado;
  }

  startMusica() {
    this.playerService.startMusica();
    this.verificaPausado = !this.verificaPausado;
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }
}
