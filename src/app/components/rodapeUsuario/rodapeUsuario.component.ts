import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/Interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodapeUsuario',
  templateUrl: './rodapeUsuario.component.html',
  styleUrls: ['./rodapeUsuario.component.scss'],
})
export class RodapeUsuarioComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  sairIcone = faSignOutAlt;
  usuario: IUsuario = null;

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario;
  }

  logOut() {
    this.spotifyService.logOut();
  }
}
