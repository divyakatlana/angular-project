import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { filmResultDTO, filmsApi, peopleDTO } from '../app/constants/api-dto';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFilmsDetails', () => {
    const mockResponse: filmResultDTO = {
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
    };

    const service = TestBed.get(HttpService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.getFilmsDetails(1).subscribe((data: any) => {
      expect(data?.results).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      'https://swapi.dev/api/films/1'
    );

    expect(req.request.method).toEqual('GET');
  });

  it('getFilmsList', () => {
    const mockResponse: filmsApi = {
      count: 0,
      next: null,
      previous: null,
      results: [
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
      ],
    };

    const service = TestBed.get(HttpService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.getFilmsList().subscribe((data: filmsApi) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('https://swapi.dev/api/films');

    expect(req.request.method).toEqual('GET');
  });

  it('getCharDetails', () => {
    const mockResponse: peopleDTO = {
      name: 'Luke Skywalker',
      height: 172,
      mass: 77,
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
      profile_path: '../assets/images/characters/1.jpg'
    };

    const service = TestBed.get(HttpService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.getcharacterDetails(1).subscribe((data: any) => {
      expect(data?.results).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      'https://swapi.dev/api/people/1'
    );

    expect(req.request.method).toEqual('GET');
  });

  it('getCharList', () => {
    const mockResponse: any = {
      count: 0,
      next: null,
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          height: 172,
          mass: 77,
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    };

    const service = TestBed.get(HttpService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.getcharacterList().subscribe((data: any) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('https://swapi.dev/api/people');

    expect(req.request.method).toEqual('GET');
  });

});
