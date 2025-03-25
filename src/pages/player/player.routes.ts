import { Routes } from '@angular/router';
import { ArtistasComponent } from '../artistas/artistas.component';
import { HomeComponent } from '../home/home.component';
import { ListaMusicasComponent } from '../listaMusicas/listaMusicas.component';
import { PlayerComponent } from './player.component';

export const PlayerRotas: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'artistas',
        component: ArtistasComponent,
      },
      {
        path: 'lista/:tipo/:id',
        component: ListaMusicasComponent,
      },
    ],
  },
];
