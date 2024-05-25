import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddFilmsDetails, AddFilmsList, AddCharactersList, AddCharactersDetails } from './app.action';

export class filmResultsModel {
  starWarMoviesList: any;
  starWarCharactersList: any;
  starWarFilmDetails: any;
  starWarCharactersDetails: any;
}

@State<filmResultsModel>({
  name: 'starWarMoviesList',
  defaults: {
    starWarMoviesList: [],
    starWarCharactersList: [],
    starWarFilmDetails: {},
    starWarCharactersDetails: {}
  }
})
export class AppState {

  @Selector()
  static getFilmResults(state: filmResultsModel) {
    return state.starWarMoviesList;
  }


  @Selector()
  static getPeopleList(state: filmResultsModel) {
    return state.starWarCharactersList;
  }

  @Selector()
  static getFilmDetails(state: filmResultsModel) {
    return state.starWarFilmDetails;
  }

  @Selector()
  static getCharactersDetails(state: filmResultsModel) {
    return state.starWarCharactersDetails;
  }

  @Action(AddFilmsList)
  addFilmsList({ getState, patchState }: StateContext<filmResultsModel>, { payload }: AddFilmsList) {
    const state = getState();
    patchState({
      starWarMoviesList: [...state.starWarMoviesList, ...payload]
    });
  }

  @Action(AddCharactersList)
  addCharactersList({ getState, patchState }: StateContext<filmResultsModel>, { payload }: AddCharactersList) {
    const state = getState();
    patchState({
      starWarCharactersList: [...state.starWarCharactersList, ...payload]
    });
  }

  @Action(AddFilmsDetails)
  addFilmDetails({ getState, patchState }: StateContext<filmResultsModel>, { payload }: AddFilmsDetails) {
    const state = getState();
    patchState({
      starWarFilmDetails: { ...state.starWarFilmDetails, ...payload }
    });
  }

  @Action(AddCharactersDetails)
  addCharactersDetails({ getState, patchState }: StateContext<filmResultsModel>, { payload }: AddCharactersDetails) {
    const state = getState();
    patchState({
      starWarCharactersDetails: { ...state.starWarCharactersDetails, ...payload }
    });
  }
}