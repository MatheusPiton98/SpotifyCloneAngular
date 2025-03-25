import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginRotas } from './login.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LoginRotas)],
  declarations: [LoginComponent],
})
export class LoginModule {}
