import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newArtista } from 'src/app/Common/factorys';
import { IArtista } from 'src/app/Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painelDireito',
  templateUrl: './painelDireito.component.html',
  styleUrls: ['./painelDireito.component.scss'],
})
export class PainelDireitoComponent implements OnInit {
  constructor(private router: Router, private spotifyService: SpotifyService) {}

  menuSelecionado: string = 'Home';

  ngOnInit(): void {
    this.buscarArtista();
  }

  artista: IArtista = newArtista();

  async buscarArtista() {
    const artistas = await this.spotifyService.buscarTopArtistas(1);
    if (!!artistas) this.artista = artistas.pop();

    // console.log(this.artista);
  }
}
