import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/Common/factorys';
import { IArtista } from 'src/app/Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-topArtista',
  templateUrl: './topArtista.component.html',
  styleUrls: ['./topArtista.component.scss'],
})
export class TopArtistaComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  artista: IArtista = newArtista();

  async buscarArtista() {
    const artistas = await this.spotifyService.buscarTopArtistas(1);
    if (!!artistas) this.artista = artistas.pop();

    // console.log(this.artista);
  }

  ngOnInit(): void {
    this.buscarArtista();
  }
}
