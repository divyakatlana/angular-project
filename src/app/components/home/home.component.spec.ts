import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../../appState/app.state';
import { SkeletonComponent } from '../shared/skeleton/skeleton.component';
import { SkeletonModule } from '../shared/skeleton/skeleton.module';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([AppState]), SkeletonModule],
      declarations: [HomeComponent, SkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as getSetDataFromState 'Star-Wars'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const HomePage = fixture.componentInstance;
    expect(HomePage.getSetDataFromState).toBeDefined();
  });

  it(`should have as filmsList 'Star-Wars'`, () => {
    const mockResponse = [
      {
        title: 'A New Hope',
        imgPath: '',
        episode_id: 4,
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.dev/api/films/1/',
        backdrop_path: '../assets/images/movies/backdrop/1.jpg'
      },
    ];
    const fixture = TestBed.createComponent(HomeComponent);
    const HomePage = fixture.componentInstance;
    HomePage.filmsList = mockResponse;
    expect(HomePage.filmsList).toEqual(mockResponse);
  });

  it('should navigate to movie', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    const url = 'localhost:4200/movie/1/';
    component.redirectToMovie(url);
    expect(navigateSpy).toHaveBeenCalledWith([`/movie/1`]);
  });
});
