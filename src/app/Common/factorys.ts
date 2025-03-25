import { IArtista } from '../Interfaces/IArtista';
import { IMusica } from '../Interfaces/IMusicas';
import { IPlaylist } from '../Interfaces/IPlaylist';

export function newArtista(): IArtista {
  return {
    id: '',
    nome: '',
    imagemUrl: '',
    musicas: [],
  };
}

export function newMusica(): IMusica {
  return {
    id: '',
    album: {
      id: '',
      nome: '',
      imagemUrl: '',
    },
    artistas: [],
    tempo: '',
    titulo: '',
  };
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imagemUrl: '',
    nome: '',
    musicas: [],
  };
}
