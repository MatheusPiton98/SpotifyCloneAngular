import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfiguration } from 'src/environments/environments';
import {
  SpotifyArtistaParaArtista,
  SpotifyMusicaParaMusica,
  SpotifyPlaylistParaPlaylist,
  SpotifySearchTracks,
  SpotifySinglePlaylistParaPlaylist,
  SpotifyUltimasBuscas,
  SpotifyUserParaUsuario,
  SptifyTopMusicasArtista,
} from '../Common/spotifyHelper';
import { IArtista } from '../Interfaces/IArtista';
import { IMusica } from '../Interfaces/IMusicas';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUsuario } from '../Interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if (!!this.usuario) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.definirAccesToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;
    } catch (error) {
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userIfo = await this.spotifyApi.getMe();
    // console.log(userIfo);
    this.usuario = SpotifyUserParaUsuario(userIfo);
  }

  obterUrlLogin(): string {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback(): string {
    if (!window.location.hash) return '';
    const hash = window.location.hash.substring(1).split('&');
    return hash[0].split('=')[1];
  }

  definirAccesToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
    // this.spotifyApi.skipToNext();
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario?.id, {
      offset,
      limit,
    });
    // console.log(playlists);
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    // console.log(artistas.items);
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    // console.log(musicas);
    return musicas.items.map((x) => SpotifyMusicaParaMusica(x.track));
  }

  async executarMusica(musicaId: string) {
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyMusicaParaMusica(musicaSpotify.item);
  }

  async voltarMusica() {
    await this.spotifyApi.skipToPrevious();
  }

  async proximaMusica() {
    await this.spotifyApi.skipToNext();
  }

  async startMusica() {
    await this.spotifyApi.play();
  }

  async pausarMusica() {
    await this.spotifyApi.pause();
  }

  async repetirMusica(tipo: string) {
    // await this.spotifyApi.setRepeat('track');
    await this.spotifyApi.setRepeat('context');
    // await this.spotifyApi.setRepeat('off');
  }

  async buscarMusicasPlaylist(
    playlistId: string,
    offset: number = 0,
    limit: number = 50
  ) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);
    if (!playlistId) return null;
    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);
    const musicas = await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });
    playlist.musicas = musicas.items.map((x) =>
      SpotifyMusicaParaMusica(x.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  async buscarTopMusicaArtista(artistaId: string): Promise<IMusica[]> {
    const musica = await this.spotifyApi.getArtistTopTracks(artistaId, 'BR');
    // console.log(musica);
    const chamaMusicaparaMusica = SptifyTopMusicasArtista(musica);
    const musicaFinal = chamaMusicaparaMusica.map(SpotifyMusicaParaMusica);
    return musicaFinal;
  }

  async buscarArtistaPorId(artistaId: string): Promise<IArtista> {
    const artista = await this.spotifyApi.getArtist(artistaId);
    // console.log(artistas.items);
    return SpotifyArtistaParaArtista(artista);
  }

  async buscaTopItens(limit = 5) {
    const topItens = await this.spotifyApi.getMyRecentlyPlayedTracks({ limit });
    const musicas = SpotifyUltimasBuscas(topItens);
    const musicasFinais = musicas.map((x) =>
      SpotifyMusicaParaMusica(x.track as SpotifyApi.TrackObjectFull)
    );
    // console.log(teste2);
    return musicasFinais;
  }

  async buscaPesquisa(query: string) {
    const pesquisa = await this.spotifyApi.searchTracks(query);
    const tracks = SpotifySearchTracks(pesquisa);
    const musicas = tracks.items.map((x) =>
      SpotifyMusicaParaMusica(x as SpotifyApi.TrackObjectFull)
    );
    // console.log(musicas);
    return musicas;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
