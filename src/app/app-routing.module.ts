import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BorangComponent } from './borang/borang.component';
import { PemukaComponent } from './pemuka/pemuka.component';
import { PokokComponent } from './pokok/pokok.component';
import { JadualComponent } from './jadual/jadual.component';
import { MaklumatComponent } from './maklumat/maklumat.component';
import { KelayakanComponent } from './kelayakan/kelayakan.component';




const routes: Routes = [
  {path: 'borang', component: BorangComponent},
  { path: 'pemuka', component: PemukaComponent },
  { path: 'pokok', component: PokokComponent },
  { path: 'jadual', component: JadualComponent },
  { path: 'maklumat', component: MaklumatComponent },
  { path: 'kelayakan', component: KelayakanComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
