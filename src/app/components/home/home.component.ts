import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HelperService } from '../../../services/helper.service';
import { HttpService } from '../../../services/http.service';
import { AddFilmsList } from '../../appState/app.action';
import { filmResultDTO, filmsApi } from '../../constants/api-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public isLoading: boolean = false;
  public filmsList: filmResultDTO[] = [];
  responsiveOptions;

  constructor(
    public httpServices: HttpService,
    public helperService: HelperService,
    private store: Store,
    public router: Router,
  ) {
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
    this.getSetDataFromState();
  }

  getSetDataFromState() {
    const appState = this.store.select(state => state?.starWarMoviesList);
    appState?.subscribe(response => {
      if (response?.starWarMoviesList?.length === 0) {
        this.getFilmList();
      } else {
        this.filmsList = response?.starWarMoviesList;
      }
    });
  }

  getFilmList() {
    this.isLoading = true;
    this.httpServices.getFilmsList().subscribe({
      next: (response) => {
        this.isLoading = false;
        let data = response as filmsApi;
        data.results = data?.results?.map((item, index) => {
          return {
            ...item, id: (index + 1), imgPath: `../../assets/images/movies/poster/${index + 1}.jpg`
            , backdrop_path: `../../assets/images/movies/backdrop/${index + 1}.jpg`
          }
        });
        if (data.results?.length > 0) {
          this.store.dispatch(new AddFilmsList(data.results));
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Film Api error response ->', err);
      }
    });
  }

  redirectToMovie(url: string) {
    const id = this.helperService.getIdfromUrl(url);
    this.router.navigate([`/movie/${id}`]);
  }

}
