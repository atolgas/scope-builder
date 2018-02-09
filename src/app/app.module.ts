import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ScopeService } from './scopes/scope.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GridComponent } from './scopes/grid/grid.component';
import { ItemComponent } from './scopes/grid/item/item.component';
import { EditComponent } from './scopes/edit/edit.component';
import { ScopesComponent } from './scopes/scopes.component';
import { DetailComponent } from './scopes/detail/detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthenticationService } from './auth/auth.service';
import { UserService } from './auth/user.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AccordionComponent, AccordionGroup } from './shared/accordion';
import { UserComponent } from './auth/user/user.component';
import { ChangePassComponent } from './auth/user/change-pass/change-pass.component';
import { ScopeListComponent } from './scope-list/scope-list.component';
import { GuessListComponent } from './guess-list/guess-list.component';
import { SearchFilterPipe } from './shared/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScopesComponent,
    GridComponent,
    ItemComponent,
    DetailComponent,
    EditComponent,
    DropdownDirective,
    SigninComponent,
    SignupComponent,
    AccordionComponent,
    AccordionGroup,
    UserComponent,
    ChangePassComponent,
    ScopeListComponent,
    GuessListComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ScopeService,
              AuthenticationService,
              UserService,
              AuthGuard,
              AccordionGroup],
  bootstrap: [AppComponent]
})
export class AppModule { }
