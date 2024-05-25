import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should pull out id form url", () => {
    const url = 'localhost:4200/movie/1/';
    expect(service.getIdfromUrl(url)).toEqual(1);
  });

  it("should  reutun false if invalid url", () => {
    const url = 'localhost:4200movie1';
    expect(service.getIdfromUrl(url)).toEqual(NaN);
  });

  it("should remove duplicate  in an array of object", () => {
    const arr = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 2 }];
    expect(service.removeDuplicates(arr)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should return empty array if array is empty", () => {
    const arr = [{}];
    expect(service.removeDuplicates(arr)).toEqual([{}]);
  })


  it("should check is ID is valid", () => {
    const id = 1;
    expect(service.checkValidId(id)).toEqual(true);
  });

  it("should check is ID is Invalid", () => {
    const id = 'asd';
    expect(service.checkValidId(id)).toEqual(false);
  });
});
