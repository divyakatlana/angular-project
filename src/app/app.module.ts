import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/includes/header/header.component';
import { FooterComponent } from './components/includes/footer/footer.component';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './components/home/home.component';
import { SkeletonModule } from './components/shared/skeleton/skeleton.module';
import { CarouselModule } from 'primeng/carousel';
import { HttpService } from '../services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './appState/app.state';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SidebarModule } from 'primeng/sidebar';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MovieDetailsComponent,
    CharacterDetailsComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    SkeletonModule,
    CarouselModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MatTabsModule,
    BrowserAnimationsModule,
    SidebarModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
