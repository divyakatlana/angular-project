import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HelperService } from '../../../services/helper.service';
import { HttpService } from '../../../services/http.service';
import { AddCharactersDetails, AddCharactersList, AddFilmsDetails, AddFilmsList } from '../../appState/app.action';
import { filmResultDTO, filmsApi, peopleDTO } from '../../constants/api-dto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  public filmId: number = 0;
  public isLoading: boolean = false;
  public movie: filmResultDTO | undefined;
  characters: any = [];
  responsiveOptions;

  constructor(public httpServices: HttpService,
    public helperServices: HelperService,
    private store: Store,
    private route: ActivatedRoute,
    public router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.filmId = Number(this.route?.snapshot?.paramMap?.get('id') || 0);
    if (!this.helperServices.checkValidId(this.filmId)) {
      this.router.navigate(['']);
    } else {
      this.getSetDataFromState();
    }
  }

  getSetDataFromState() {
    const filmsState = this.store.select(state => state?.starWarMoviesList);
    filmsState?.subscribe(response => {
      if (response?.starWarMoviesList?.length === 0) {
        this.getMovieList();
      } else {
        const filmsList = response?.starWarMoviesList;
        const isFilmInHistory = response?.starWarFilmDetails;
        if (isFilmInHistory?.id === this.filmId) {
          this.movie = isFilmInHistory;
          this.characters = this.movie?.characters;
        } else {
          let findFilm = filmsList?.find((item: filmResultDTO) => {
            return item?.id === this.filmId;
          });
          if (!!findFilm) {
            this.movie = findFilm;
            if (findFilm.characters?.length > 0 && !(typeof findFilm.characters[0] === "string") && this.instanceOfPeopleDTO(findFilm.characters[0]))
              this.characters = findFilm.characters;
            else
              this.getCharactersFromFilm(findFilm);
          }
        }
      }
    });
  }

  instanceOfPeopleDTO(object: any): object is peopleDTO {
    return 'id' in object;
  }

  getMovieList() {
    this.isLoading = true;
    this.httpServices.getFilmsList().subscribe({
      next: (response) => {
        this.isLoading = false;
        let data = response as filmsApi;
        data.results = data?.results?.map((item, index) => {
          return {
            ...item, id: (index + 1), imgPath: `../../assets/images/movies/poster/${index + 1}.jpg`,
            backdrop_path: `../../assets/images/movies/backdrop/${index + 1}.jpg`
          }
        });
        if (data.results?.length > 0) {
          this.store.dispatch(new AddFilmsList(data.results));
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Film Details Api error response ->', err);
      }
    });
  }


  getCharactersFromFilm(movieDetails: filmResultDTO) {
    const charactersDetailsApiCall = movieDetails?.characters?.filter(item => {
      if (this.helperServices.getIdfromUrl(item) <= 0)
        return false;
      else
        return true;
    }).map(item => {
      const id = this.helperServices.getIdfromUrl(item);
      return this.httpServices.getcharacterDetails(id);
    });
    if (charactersDetailsApiCall.length !== 0) {
      this.isLoading = true;
      forkJoin(charactersDetailsApiCall).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          let charactersList = response as peopleDTO[] || [];
          if (charactersList?.length > 0) {
            movieDetails.characters = charactersList?.map((item: peopleDTO, index: number) => {
              return { ...item, id: (index + 1), profile_path: `../../assets/images/characters/${index + 1}.jpg` }
            });
            this.movie = movieDetails;
            this.characters = movieDetails.characters
            if (!!movieDetails) {
              this.store.dispatch(new AddFilmsDetails(movieDetails));
              this.store.dispatch(new AddCharactersList(movieDetails?.characters));
            }
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('characters DetailsApi error response ->', err);
        }
      });
    }
  }

  redirectTocharacters(item: peopleDTO) {
    this.store.dispatch(new AddCharactersDetails(item));
    this.router.navigate([`/character/${item?.id}`]);
  }

}
