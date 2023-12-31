import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({providedIn: 'root'})
export class HeroesServiceService {


  private basUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes() : Observable<Hero[]> {

    return this.httpClient.get<Hero[]>(`${ this.basUrl }/heroes`);
  }


  getHeroById(id: string) : Observable<Hero |undefined> {
    return this.httpClient.get<Hero>(`${this.basUrl}/heroes/${ id }`)
    .pipe(
      catchError( error => of(undefined))
    );
  }


  getSuggestions(query: string) : Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.basUrl}/heroes?q=${query}&_limit=6`);
  }


  addHero ( hero:Hero) : Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.basUrl}/heroes`, hero);
  }

  updateHero ( hero:Hero) : Observable<Hero> {
    if (!hero.id) throw Error( "Hero id is required");

    return this.httpClient.patch<Hero>(`${this.basUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById ( id:string) : Observable<boolean> {


    return this.httpClient.delete<Hero>(`${this.basUrl}/heroes/${id}`)
    .pipe(
      catchError(err => of(false)),
      map( resp => true)
    );
  }

}
