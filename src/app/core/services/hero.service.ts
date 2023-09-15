import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HEROES } from './mock-heroes';
import { Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  //GET /heroes
  getHeroes(): Observable<Hero[]>{

    return this.http
    .get<Hero[]>(this.heroesUrl)
    .pipe(tap((heroes) => this.log(`Fetched ${heroes.length} hero(es)`)));

  }

  //GET /heroes/id
  getHero(id: number): Observable<Hero>{

    return this.http
    .get<Hero>(`${this.heroesUrl}/${id}`)
    .pipe(tap((hero) => this.log(`Fetched hero id=${id} and name=${hero.name}`)));

  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${ message }`);
  }

}
