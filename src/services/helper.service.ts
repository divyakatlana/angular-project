import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getIdfromUrl(url: string): number {
    if (!!url && typeof url === 'string') {
      const arr = url?.split('/');
      if (arr?.length > 0) {
        const id = Number(arr[arr.length - 2]);
        return id;
      } 
    } 
    return 0;
  }

  checkValidId(id: any) {
    const parseId = Number(id || 0);
    if (isNaN(parseId) || parseId < 1) {
      return false;
    } else {
      return true;
    }
  }

  removeDuplicates(arr: any[]) {
    return arr?.length > 0
      ? _.uniqBy(arr, function (e) {
          return e.id;
        })
      : [];
  }
}
