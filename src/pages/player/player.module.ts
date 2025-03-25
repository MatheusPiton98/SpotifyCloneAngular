import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArtistaItemImagemComponent } from 'src/app/components/artistaItemImagem/artistaItemImagem.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { BotaoMenuComponent } from 'src/app/components/botaoMenu/botaoMenu.component';
import { BuscasRecentesComponent } from 'src/app/components/buscasRecentes/buscasRecentes.component';
import { PainelDireitoComponent } from 'src/app/components/painelDireito/painelDireito.component';
import { PeinelEsquerdoComponent } from 'src/app/components/peinelEsquerdo/peinelEsquerdo.component';
import { PlayerCardComponent } from 'src/app/components/playerCard/playerCard.component';
import { RodapeUsuarioComponent } from 'src/app/components/rodapeUsuario/rodapeUsuario.component';
import { TopArtistaComponent } from 'src/app/components/topArtista/topArtista.component';
import { TopArtistasComponent } from 'src/app/components/topArtistas/topArtistas.component';
import { ArtistasComponent } from '../artistas/artistas.component';
import { HomeComponent } from '../home/home.component';
import { ListaMusicasComponent } from '../listaMusicas/listaMusicas.component';
import { PlayerComponent } from './player.component';
import { PlayerRotas } from './player.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas),
    FontAwesomeModule,
    FormsModule,
  ],
  declarations: [
    PlayerComponent,
    PeinelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    ArtistaItemImagemComponent,
    PlayerCardComponent,
    ListaMusicasComponent,
    BannerComponent,
    ArtistasComponent,
  ],
})
export class PlayerModule {}
