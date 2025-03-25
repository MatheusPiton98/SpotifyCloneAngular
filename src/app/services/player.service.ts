import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newMusica } from '../Common/factorys';
import { IMusica } from '../Interfaces/IMusicas';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  timerId: any = null;

  async obterMusicaAtual() {
    clearTimeout(this.timerId);
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);

    // loop para verificar a musica atual
    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 1000);
  }

  definirMusicaAtual(musica: IMusica) {
    this.musicaAtual.next(musica);
  }

  async voltarMusica() {
    await this.spotifyService.voltarMusica();
  }

  async proximaMusica() {
    await this.spotifyService.proximaMusica();
  }

  async startMusica() {
    await this.spotifyService.startMusica();
  }

  async pausarMusica() {
    await this.spotifyService.pausarMusica();
  }

  async repetirMusica(tipo: string) {
    await this.spotifyService.repetirMusica(tipo);
  }
}
