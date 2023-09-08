import { Component, OnInit } from "@angular/core";
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { Hero } from "../hero.model";
import { Location } from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero!: Hero;

  constructor(
    private heroesService: HeroService,
    private location: Location,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.getHero();

  }

  getHero(): void{

    const id = Number(this.routes.snapshot.paramMap.get('id'));

    this.heroesService.getHero(id).subscribe(hero => (this.hero = hero));

  }

  goBack(): void{

    this.location.back();

  }

}


