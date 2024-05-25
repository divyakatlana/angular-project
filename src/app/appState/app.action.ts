import { filmResultDTO, peopleDTO } from "../constants/api-dto";


export class AddFilmsList {
  static readonly type = '[Curr] AddFilmsList';
  constructor(public payload: filmResultDTO[]) { }
}

export class AddCharactersList {
  static readonly type = '[Curr] AddCharactersList';
  constructor(public payload: peopleDTO[]) { }
}

export class AddFilmsDetails {
  static readonly type = '[Curr] AddFilmsDetails';
  constructor(public payload: filmResultDTO) { }
}

export class AddCharactersDetails {
  static readonly type = '[Curr] AddCharactersDetails';
  constructor(public payload: peopleDTO) { }
}