import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should call github api with foo as parameter'`, () => {
    const get = spyOn(service.http, 'get');
    const url = 'https://api.github.com/search/users?q=foo';

    service.getUser('foo');

    expect(get).toHaveBeenCalledWith(url);
  });
});
