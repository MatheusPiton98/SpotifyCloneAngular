import { format } from 'date-fns';
import addMilliseconds from 'date-fns/addMilliseconds';
import { IArtista } from '../Interfaces/IArtista';
import { IMusica } from '../Interfaces/IMusicas';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUsuario } from '../Interfaces/IUsuario';
import { newMusica, newPlaylist } from './factorys';

export function SpotifyUserParaUsuario(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUsuario {
  const userId = user.id?.length ? user?.id : undefined;
  return {
    id: userId,
    nome: user.display_name,
    imagemUrl: user.images.pop().url,
  };
}

export function SpotifyPlaylistParaPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  const imagemUrl = playlist.images?.length
    ? playlist.images.pop()?.url
    : undefined;
  return {
    id: playlist.id,
    nome: playlist.name,
    imagemUrl: imagemUrl,
  };
}

export function SpotifySinglePlaylistParaPlaylist(
  playlist: SpotifyApi.SinglePlaylistResponse
): IPlaylist {
  const imagemUrl = playlist.images?.length
    ? playlist.images.pop()?.url
    : undefined;

  if (!playlist) return newPlaylist();
  return {
    id: playlist.id,
    nome: playlist.name,
    imagemUrl: imagemUrl,
    musicas: [],
  };
}

export function SpotifyArtistaParaArtista(
  artista: SpotifyApi.ArtistObjectFull
): IArtista {
  return {
    id: artista.id,
    nome: artista.name,
    imagemUrl: artista.images.sort((a, b) => a.width - b.width).pop().url,
  };
}

export function SpotifyMusicaParaMusica(
  musica: SpotifyApi.TrackObjectFull
): IMusica {
  if (!musica) return newMusica();
  const msToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  };
  return {
    id: musica.uri,
    titulo: musica.name,
    album: {
      id: musica.album.id,
      nome: musica.album.name,
      imagemUrl: musica.album.images.shift().url,
    },
    artistas: musica.artists.map((a) => ({
      id: a.id,
      nome: a.name,
    })),
    tempo: msToMinutes(musica.duration_ms),
  };
}

export function SptifyTopMusicasArtista(
  musica: SpotifyApi.ArtistsTopTracksResponse
) {
  return musica.tracks;
}

export function SpotifyUltimasBuscas(
  musica: SpotifyApi.UsersRecentlyPlayedTracksResponse
) {
  return musica.items;
}

export function SpotifySearchTracks(musica: SpotifyApi.TrackSearchResponse) {
  return musica.tracks;
}
