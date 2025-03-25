import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factorys';
import { IMusica } from 'src/app/Interfaces/IMusicas';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-listaMusicas',
  templateUrl: './listaMusicas.component.html',
  styleUrls: ['./listaMusicas.component.scss'],
})
export class ListaMusicasComponent implements OnInit, OnDestroy {
  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  bannerImagemUrl = '';
  bannerTexto = '';

  subs: Subscription[] = [];

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  playIcone = faPlay;
  pauseIcone = faPause;

  titulo: string = '';

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  obterMusicas() {
    const sub = this.activedRoute.paramMap.subscribe(async (p) => {
      const tipo = p.get('tipo');
      const id = p.get('id');

      await this.obterDadosPagina(tipo, id);
    });

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string) {
    if (tipo === 'playlist') await this.obterDadosPlaylist(id);
    else if (tipo === 'search')
      await this.obterDadosPesquisa(id.replace('%20', ' '));
    else await this.obterDadosArtista(id);
  }

  async obterDadosPlaylist(playlistId: string) {
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(
      playlistId
    );
    this.definirDadosPagina(
      playlistMusicas.nome,
      playlistMusicas.imagemUrl,
      playlistMusicas.musicas
    );
    this.titulo = 'Musicas da Playlist: ' + playlistMusicas.nome;
  }

  async obterDadosPesquisa(artistaId: string) {
    const musias = await this.spotifyService.buscaPesquisa(artistaId);
    // console.log(musias);
    this.definirDadosPagina(artistaId, musias[0].album.imagemUrl, musias);
    this.titulo = 'Resultados para: ' + artistaId;
  }

  async obterDadosArtista(artistaId: string) {
    const artistaMusias = await this.spotifyService.buscarTopMusicaArtista(
      artistaId
    );
    const artista = await this.spotifyService.buscarArtistaPorId(artistaId);
    // console.log(artistaMusias);
    this.definirDadosPagina(artista.nome, artista.imagemUrl, artistaMusias);
    this.titulo = 'Musicas da Playlist: ' + artista.nome;
  }

  definirDadosPagina(
    bannerTexto: string,
    bannerImage: string,
    musicas: IMusica[]
  ) {
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map((a) => a.nome).join(', ');
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }
}
