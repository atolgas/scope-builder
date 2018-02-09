import { ScopeListComponent } from './scope-list/scope-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './scopes/edit/edit.component';
import { ScopesComponent } from './scopes/scopes.component';
import { DetailComponent } from './scopes/detail/detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';
import { UserComponent } from './auth/user/user.component';
import { ChangePassComponent } from './auth/user/change-pass/change-pass.component';
import { GuessListComponent } from './guess-list/guess-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'scopes', pathMatch: 'full' },
  { path: 'scopes', component: ScopesComponent, canActivate: [AuthGuard], children: [
    { path: 'new', component: EditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: DetailComponent, canActivate: [AuthGuard] },
    { path: ':id/edit', component: EditComponent, canActivate: [AuthGuard] },
  ] },
  { path: 'scope-list', component: ScopeListComponent, canActivate: [AuthGuard]},
  { path: 'guess-list', component: GuessListComponent, canActivate: [AuthGuard]},
  { path: 'login', component: SigninComponent},
  { path: 'register', component: SignupComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], children: [
    { path: 'change-password', component: ChangePassComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
