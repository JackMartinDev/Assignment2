import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AdduserComponent } from './adduser/adduser.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';

const routes: Routes = [{path:'login',component:LoginComponent},{path:'chat',component:ChatComponent}, {path: 'adduser', component:AdduserComponent}, {path: 'deleteuser', component:DeleteuserComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
