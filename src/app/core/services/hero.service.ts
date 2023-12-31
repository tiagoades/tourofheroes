import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
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
  getAll(): Observable<Hero[]>{

    return this.http
    .get<Hero[]>(this.heroesUrl)
    .pipe(
      tap((heroes) => this.log(`Fetched ${heroes.length} hero(es)`)));

  }

  //GET /heroes/id
  getOne(id: number): Observable<Hero>{

    return this.http
    .get<Hero>(this.getUrl(id))
    .pipe(
      tap((hero) => this.log(`Fetched ${this.descAttributes(hero)}`)));


  }

  //GET /heroes?name=term
  search(term: string): Observable<Hero[]> {

    if(!term.trim()){
      return of([]);
    }

    return this.http
    .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
    .pipe(
      tap( (heroes) =>
        heroes.length
        ? this.log(`Found ${heroes.length} hero(es) matching "${term}"`)
        : this.log(`No heroes matching "${term}"`)

      )
    );
  }

  //PUT /heroes/id
  update(hero: Hero): Observable<Hero>{

    return this.http.put<Hero>(this.getUrl(hero.id), hero)
    .pipe(
      tap((hero) => this.log(`Updated ${this.descAttributes(hero)}`))
    );

  }

  //POST /heroes
  create(hero: Hero): Observable<Hero>{

    return this.http.post<Hero>(this.heroesUrl, hero)
    .pipe(
      tap((hero) => this.log(`Created ${this.descAttributes(hero)}`))
    );
  }

  //DELETE /heroes/id
  delete(hero: Hero): Observable<any>{
    return this.http.delete<any>(this.getUrl(hero.id))
    .pipe(
      tap(() => this.log(`Deleted ${this.descAttributes(hero)}`))
    )
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${ message }`);
  }

  private descAttributes(hero: Hero): string{

    return `Hero ID=${hero.id} and Name=${hero.name}`;

  }

  private getUrl(id: number): string{

    return `${this.heroesUrl}/${id}`;

  }

}
