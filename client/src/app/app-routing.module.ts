import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SentenceAreaComponent } from './sentence/sentence-area/sentence-area.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'pos',
    component: SentenceAreaComponent,
    data: { message: 'pos' },
  },
  {
    path: 'ner',
    component: SentenceAreaComponent,
    data: { message: 'ner' },
  },
  { path: 'signIn', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
