import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HelperService } from '../../../services/helper.service';
import { HttpService } from '../../../services/http.service';
import { AddCharactersList, AddFilmsList } from '../../appState/app.action';
import { filmResultDTO, filmsApi, peopleApi, peopleDTO } from '../../constants/api-dto';
import * as _ from "lodash";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit {
  public peopleId: number = 0;
  public isLoading: boolean = false;
  public starWarCharacterDetails = {} as peopleDTO;
  public filmsList: filmResultDTO[] = [];
  responsiveOptions


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
    this.peopleId = Number(this.route?.snapshot?.paramMap?.get('id') || 0);
    if (!!this.peopleId && this.peopleId < 1) {
      this.router?.navigate(['/']);
    } else {
      this.getSetDataFromState();
    }
  }


  getSetDataFromState() {
    const filmsState = this.store.select(state => state?.starWarMoviesList);
    if (!!filmsState) {
      filmsState?.subscribe(response => {
        if (response?.starWarMoviesList?.length === 0) {
          this.getMovieList();
        }
        if (response?.starWarCharactersList?.length === 0) {
          this.getPeopleList();
        } else {
          const peopelList = response?.starWarCharactersList;
          const currFilm = response?.starWarFilmDetails as any;
          const findPeople = peopelList?.find((ele: peopleDTO) => { return this.helperServices.getIdfromUrl(ele?.url) === this.peopleId })
          this.starWarCharacterDetails = findPeople;
          if (!!currFilm && !_.isEmpty(currFilm)) {
            this.starWarCharacterDetails.currFilm = currFilm;
          }
          if (!!response?.starWarMoviesList) {
            let filmList = response?.starWarMoviesList?.filter((ele: filmResultDTO) => {
              return findPeople?.films?.includes(ele?.url);
            });
            if (!!filmList && !_.isEmpty(filmList)) {
              this.starWarCharacterDetails.filmList = this.helperServices.removeDuplicates(filmList);
              this.filmsList = this.starWarCharacterDetails.filmList;
            }
          }
        }
      });
    }

  }
  getPeopleList() {
    this.isLoading = true;
    this.httpServices.getcharacterList().subscribe({
      next: (response) => {
        this.isLoading = false;
        let data = response as peopleApi;
        data.results = data?.results.map((item, index) => {
          return {
            ...item, profile_path: `../../assets/images/characters/${index + 1}.jpg`
          }
        });

        if (!!data) {
          this.store.dispatch(new AddCharactersList(data.results));
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log('api res error ->', err);
      }
    });
  }

  getMovieList() {
    this.isLoading = true;
    this.httpServices.getFilmsList().subscribe({
      next: (response) => {
        this.isLoading = false;
        const data = response as filmsApi;
        data.results = data?.results?.map((item, index) => {
          return {
            ...item, id: (index + 1), imgPath: `../../assets/images/movies/poster/${index + 1}.jpg`,
            backdrop_path: `../../assets/images/movies/backdrop/${index + 1}.jpg`
          }
        });
        if (data.results?.length > 0) {
          let filmList = data.results?.filter((ele: filmResultDTO) => {
            return this.starWarCharacterDetails?.films?.includes(ele?.url);
          });
          const finalList = this.helperServices.removeDuplicates(filmList);
          if (!!finalList && finalList?.length > 0) {
            this.starWarCharacterDetails.filmList = this.helperServices.removeDuplicates(filmList);
            this.store.dispatch(new AddFilmsList(data.results));
            this.filmsList = finalList;
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log('api res error ->', err);
      }
    });
  }

  redirectToMovie(id: number) {
    this.router.navigate([`/movie/${id}`]);
  }
}
