import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faPauseCircle,
  faPlayCircle,
  faRandom,
  faRefresh,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factorys';
import { IMusica } from 'src/app/Interfaces/IMusicas';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-playerCard',
  templateUrl: './playerCard.component.html',
  styleUrls: ['./playerCard.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  constructor(private playerService: PlayerService) {}

  subs: Subscription[] = [];
  musica: IMusica = newMusica();

  public verificaPausado: boolean = this.musica != newMusica() ? false : true;

  // Icones
  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;
  pauseIcone = faPauseCircle;
  startIcone = faPlayCircle;
  randomIcone = faRandom;
  refreshIcone = faRefresh;

  repeat: string = '';

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe((m) => {
      this.musica = m;
    });

    this.subs.push(sub);
  }

  voltarMusica() {
    this.playerService.voltarMusica();
  }

  proximaMusica() {
    this.playerService.proximaMusica();
  }

  pausarMusica() {
    this.playerService.pausarMusica();
    this.verificaPausado = !this.verificaPausado;
  }

  repetirMusica(tipo: string) {
    this.playerService.repetirMusica(tipo);
  }

  startMusica() {
    this.playerService.startMusica();
    this.verificaPausado = !this.verificaPausado;
  }
}
